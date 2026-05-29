import {
	ACCESS_TOKEN_EXPIRY_S,
	REFRESH_TOKEN_EXPIRY_S,
	TokenPayload,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtService {
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * safely signs the JWT token
	 * @param payload data to be signed
	 * @param envKey environmental secret key
	 * @param expiry expiry time in seconds
	 * @returns jwt token
	 */
	sign(params: {
		payload: Record<string, string>;
		envKey: string;
		expiry: number;
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
				expiresIn: params.expiry,
			},
		);

		return token;
	}

	/**
	 * signs the token, then sets the secure cookie
	 * @param payload data to be signed
	 * @param envKey environmental secret key
	 * @param expiry expiry time in seconds
	 * @param response raw response object
	 * @param name name of the token
	 * @returns jwt token
	 */
	issue(
		params: Parameters<typeof this.sign>[0] & {
			response: Response;
			name: string;
		},
	) {
		// signing the token
		const token = this.sign(params);

		// setting the cookie
		params.response.cookie(params.name, token, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: params.expiry * 1000,
		});

		return token;
	}

	/**
	 * signs access and refresh tokens, sets the secure cookie, and returns them
	 * @param response raw response object
	 * @param sessionId id of the database's session
	 * @param userId id of the user
	 * @returns access and refresh tokens
	 */
	issueAuthTokens(params: { response: Response; payload: TokenPayload }) {
		// access token
		const accessToken = this.issue({
			payload: params.payload,
			expiry: ACCESS_TOKEN_EXPIRY_S,
			envKey: "ACCESS_TOKEN_SECRET",
			response: params.response,
			name: "accessToken",
		});

		// refresh token
		const refreshToken = this.issue({
			payload: params.payload,
			expiry: REFRESH_TOKEN_EXPIRY_S,
			envKey: "REFRESH_TOKEN_SECRET",
			response: params.response,
			name: "refreshToken",
		});

		return { accessToken, refreshToken };
	}

	/**
	 * decodes the jwt token payload
	 * @param request request object
	 * @param type type of the token
	 * @returns token and decoded payload or null if no token
	 */
	decode(params: { request: Request; type: "access" | "refresh" }) {
		// getting the token
		const token = (params.request.cookies as Record<string, string>)[
			`${params.type}Token`
		];

		// validating the token
		if (!token || typeof token !== "string") {
			return null;
		}

		return { token, payload: jwt.decode(token) as TokenPayload };
	}

	/**
	 * issues auth tokens, hashes the refresh token, and creates a new session attached to the refresh token
	 * @param request request object
	 * @param response response object
	 * @param userId id of the authenticated user
	 * @returns created session and tokens
	 */
	async createAuthSession(params: {
		request: Request;
		response: Response;
		userId: string;
	}) {
		// creating the session
		const user_agent = params.request.headers["user-agent"] ?? "";
		const ip_address = params.request.ip;

		const session = await this.prismaService.auth_session.create({
			data: {
				user_id: params.userId,
				refresh_token_hash: "",
				ip_address,
				user_agent,
			},
		});

		// issue access token (sign + set cookie)
		const { accessToken, refreshToken } = this.issueAuthTokens({
			response: params.response,
			payload: {
				sessionId: session.id,
				userId: params.userId,
			},
		});

		// hashing refresh token
		const salt = await bcrypt.genSalt(10);
		const refreshTokenHash = await bcrypt.hash(refreshToken, salt);

		// updating session
		await this.prismaService.auth_session.update({
			where: {
				id: session.id,
			},
			data: {
				refresh_token_hash: refreshTokenHash,
			},
		});

		return { accessToken, refreshToken, session };
	}

	/**
	 * deletes a specified token from cookies
	 * @param response response object
	 * @param type which type of token to delete
	 */
	delete(params: { response: Response; type: "access" | "refresh" | "all" }) {
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
