import { AuthConfig, generateId, randomGroupFormEmoji } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UAParser } from "ua-parser-js";
import z from "zod";

import { createException } from "../../common";
import { TokenPayloadSchema, tokenPayloadSchema } from "../auth/auth.types";
import { AuthContextType } from "../auth-core/decorators";
import { AppConfigService } from "../config/config.service";
import { EnvSchema } from "../config/config.types";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AppJwtService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: AppConfigService,
	) {}

	/**
	 * safely signs the JWT token
	 * @param payload data to be signed
	 * @param envKey environmental secret key
	 * @param expiryMs expiry time in milliseconds
	 * @returns jwt token
	 */
	sign(params: {
		payload: Record<string, string>;
		envKey: keyof EnvSchema;
		expiryMs: number;
	}) {
		// error handling
		if (typeof this.configService.get(params.envKey) !== "string") {
			throw new Error(`Invalid environment variable: ${params.envKey}`);
		}

		// signing
		const token = jwt.sign(
			params.payload,
			this.configService.get(params.envKey),
			{
				expiresIn: `${params.expiryMs}`,
			},
		);

		return token;
	}

	/**
	 * securely sets the jwt token at the http-only cookies
	 * @param name name of the token
	 * @param token jwt token
	 * @param expiryMs expiry in milliseconds
	 * @param response Response object
	 */
	setHttpCookie(params: {
		name: string;
		token: string;
		expiryMs: number;
		response: Response;
	}) {
		params.response.cookie(params.name, params.token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: params.expiryMs,
		});
	}

	/**
	 * verifies and decodes the jwt token payload
	 * @param token jwt token
	 * @param schema schema to validate the token with
	 * @returns token and decoded payload or null if not validated
	 */
	verify<T extends z.ZodType = typeof tokenPayloadSchema>(params: {
		token: string;
		key: keyof EnvSchema;
		schema?: T;
	}): z.infer<T> {
		// validating
		try {
			// verifying
			const decodedToken = jwt.verify(
				params.token,
				this.configService.get(params.key),
			);

			// parsing token
			const parsed = ((params.schema ?? tokenPayloadSchema) as T).safeParse(
				decodedToken,
			);

			if (!parsed.success) {
				throw new Error(
					`jwt token is verified but not parsed. ${parsed.error.message}`,
				);
			}

			return parsed.data;
		} catch (e) {
			const message = e instanceof Error ? e.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				message ?? "jwt token not verified.",
			);
		}
	}

	/**
	 * gets the raw versions of access and refresh tokens cookies
	 * @param request Request object
	 * @returns access and refresh tokens (or null if not found)
	 */
	getAuthTokens(params: { request: Request }) {
		const accessToken = params.request.cookies["accessToken"] as unknown;
		const refreshToken = params.request.cookies["refreshToken"] as unknown;

		return {
			accessToken: typeof accessToken === "string" ? accessToken : null,
			refreshToken: typeof refreshToken === "string" ? refreshToken : null,
		};
	}

	/**
	 * sets both tokens given a payload
	 * @param payload token payload
	 * @param request request object
	 * @param response response object
	 */
	issueAuthTokens(params: {
		payload: TokenPayloadSchema;
		request: Request;
		response: Response;
	}) {
		// signing tokens
		const accessToken = this.sign({
			payload: params.payload,
			expiryMs: AuthConfig.tokens.access.expiryMs,
			envKey: "ACCESS_TOKEN_SECRET",
		});

		const refreshToken = this.sign({
			payload: params.payload,
			expiryMs: AuthConfig.tokens.refresh.expiryMs,
			envKey: "REFRESH_TOKEN_SECRET",
		});

		// setting cookies
		this.setAuthHttpCookies({
			accessToken,
			refreshToken,
			response: params.response,
		});
	}

	/**
	 * issues access and refresh tokens along with a session, tied to the user
	 * @param userId id of the user
	 * @returns access token, refresh token and session
	 */
	async issueAuthData(params: {
		userId: string;
		ctx: AuthContextType;
		config?: { createGroup: boolean };
	}) {
		// session
		const session = await this.prismaService.auth_sessions.create({
			data: {
				id: generateId(),
				user_id: params.userId,
				refresh_token_hash: "",
				expiry_at: new Date(Date.now() + AuthConfig.tokens.refresh.expiryMs),
			},
		});

		// signing tokens
		const payload: TokenPayloadSchema = {
			sessionId: session.id,
			userId: params.userId,
		};

		const accessToken = this.sign({
			payload,
			expiryMs: AuthConfig.tokens.access.expiryMs,
			envKey: "ACCESS_TOKEN_SECRET",
		});

		const refreshToken = this.sign({
			payload,
			expiryMs: AuthConfig.tokens.refresh.expiryMs,
			envKey: "REFRESH_TOKEN_SECRET",
		});

		// hashing the refresh token
		const salt = await bcrypt.genSalt(10);
		const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

		// parsing user agent
		const { browser, cpu, device, os } = await UAParser(
			params.ctx.userAgent,
		).withClientHints();

		// updating the session
		const updatedSession = await this.prismaService.auth_sessions.update({
			where: {
				id: session.id,
			},
			data: {
				refresh_token_hash: refreshTokenHash,
				ip: params.ctx.ip,
				browser: {
					major: browser.major,
					name: browser.name,
					type: browser.type,
					version: browser.version,
				},
				device: {
					model: device.model,
					type: device.type ?? "desktop",
					vendor: device.vendor,
				},
				cpu: {
					architecture: cpu.architecture,
				},
				os: {
					name: os.name,
					version: os.version,
				},
			},
		});

		if (params.config?.createGroup !== false) {
			// checking if the user is already connected to a group
			const found = await this.prismaService.connections.findFirst({
				where: {
					user_id: session.user_id,
				},
			});

			if (!found) {
				// creating the connected group session if we're logging in
				await this.prismaService.connections_group.create({
					data: {
						id: generateId(),
						title: "Default",
						emoji: randomGroupFormEmoji(),
						connections: {
							create: {
								id: generateId(),
								user_id: params.userId,
							},
						},
						owner_user_id: params.userId,
					},
				});
			}
		}

		return { accessToken, refreshToken, session: updatedSession };
	}

	/**
	 * sets both access and refresh tokens securely at the http-only cookies
	 * @param accessToken access jwt token
	 * @param refreshToken refresh jwt token
	 * @param response response object
	 */
	setAuthHttpCookies(params: {
		accessToken: string;
		refreshToken: string;
		response: Response;
	}) {
		// access
		this.setHttpCookie({
			name: "accessToken",
			token: params.accessToken,
			expiryMs: AuthConfig.tokens.access.expiryMs,
			response: params.response,
		});

		// refresh
		this.setHttpCookie({
			name: "refreshToken",
			token: params.refreshToken,
			expiryMs: AuthConfig.tokens.refresh.expiryMs,
			response: params.response,
		});
	}

	/**
	 * deletes a specified token from cookies
	 * @param response response object
	 * @param type which type of token to delete
	 */
	deleteAuthTokens(params: {
		response: Response;
		type: "access" | "refresh" | "all";
	}) {
		// access token
		if (params.type === "access" || params.type === "all") {
			params.response.clearCookie("accessToken");
		}

		// refresh token
		if (params.type === "refresh" || params.type === "all") {
			params.response.clearCookie("refreshToken");
		}
	}
}
