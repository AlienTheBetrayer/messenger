import {
	ACCESS_TOKEN_EXPIRY_S,
	REFRESH_TOKEN_EXPIRY_S,
	TokenPayload,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";
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
}
