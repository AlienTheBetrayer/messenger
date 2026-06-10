import { usersSchema, usersType } from "@gravity/shared";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import jwt from "jsonwebtoken";

import { AuthGuardUserType } from "./auth.types";

export type AuthenticatedUserType = usersType;

/**
 * decorator for getting the authenticated user. (works only if auth guard is set)
 * @returns authenticated user object. null if not parsed. undefined if not found.
 */
export const AuthenticatedUser = createParamDecorator(
	(body, ctx: ExecutionContext) => {
		// request
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req.user;

		// validation
		if (!user) {
			return undefined;
		}

		// parsing
		const parsed = usersSchema.safeParse(user);

		if (!parsed.success) {
			return null;
		}

		return parsed.data;
	},
);

export type AuthContextType = {
	ip: string | undefined;
	userAgent: string | undefined;
};

/**
 * decorator for getting the client ip and user agent
 * @returns ip and user agent
 */
export const AuthContext = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();

		return {
			ip: req.ip,
			userAgent: req.headers["user-agent"],
		} satisfies AuthContextType;
	},
);

export type RefreshTokenType = string | undefined;

/**
 * decorator for getting the refresh token
 * @returns refresh token string or undefined
 */
export const RefreshToken = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		return req.cookies["refreshToken"] as RefreshTokenType;
	},
);

export type AccessTokenType = string | undefined;

/**
 * decorator for getting the access token
 * @returns access token string or undefined
 */
export const AccessToken = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		return req.cookies["accessToken"] as AccessTokenType;
	},
);

/**
 * decorator for getting the refresh token payload
 * @returns refresh token payload or undefined
 */
export const RefreshTokenPayload = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const refreshToken = req.cookies["refreshToken"] as RefreshTokenType;

		if (!refreshToken) {
			return;
		}

		try {
			const payload = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
			return payload;
		} catch {
			return;
		}
	},
);

/**
 * decorator for getting the refresh token payload
 * @returns refresh token payload or undefined
 */
export const AccesshTokenPayload = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const accessToken = req.cookies["accessToken"] as AccessTokenType;

		if (!accessToken) {
			return;
		}

		try {
			const payload = jwt.verify(accessToken, "ACCESS_TOKEN_SECRET");
			return payload;
		} catch {
			return;
		}
	},
);
