import { AuthConfig } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";

import { TokenPayloadSchema, tokenPayloadSchema } from "../auth/auth.types";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtService {
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * safely signs the JWT token
	 * @param payload data to be signed
	 * @param envKey environmental secret key
	 * @param expiryMs expiry time in milliseconds
	 * @returns jwt token
	 */
	sign(params: {
		payload: Record<string, string>;
		envKey: string;
		expiryMs: number;
	}) {
		// error handling
		if (!(params.envKey in process.env)) {
			throw new Error(`Missing environment variable: ${params.envKey}`);
		}

		if (typeof process.env[params.envKey] !== "string") {
			throw new Error(`Invalid environment variable: ${params.envKey}`);
		}

		// signing
		const token = jwt.sign(
			params.payload,
			process.env[params.envKey] as string,
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
	 * validates and decodes the jwt token payload
	 * @param token jwt token
	 * @param schema schema to validate the token with
	 * @returns token and decoded payload or null if not validated
	 */
	decode<T extends z.ZodType = typeof tokenPayloadSchema>(params: {
		token: string;
		schema?: T;
	}): z.infer<T> | null {
		// validating the token
		if (!params.token || typeof params.token !== "string") {
			return null;
		}

		const decodedToken = jwt.decode(params.token);

		if (!decodedToken) {
			return null;
		}

		const parsed = ((params.schema ?? tokenPayloadSchema) as T).safeParse(
			decodedToken,
		);

		if (!parsed.success) {
			return null;
		}

		return parsed.data;
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
	 * issues access and refresh tokens along with a session, tied to the user
	 * @param userId id of the user
	 * @returns access token, refresh token and session
	 */
	async issueAuthTokens(params: { userId: string }) {
		// session
		const session = await this.prismaService.auth_session.create({
			data: {
				user_id: params.userId,
				refresh_token_hash: "",
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

		// updating the session
		const updatedSession = await this.prismaService.auth_session.update({
			where: {
				id: session.id,
			},
			data: {
				refresh_token_hash: refreshTokenHash,
			},
		});

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
