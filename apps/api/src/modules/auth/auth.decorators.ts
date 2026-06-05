import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

/**
 * types for decorators
 */
export type AuthContextType = {
	ip: string | undefined;
	userAgent: string | undefined;
};

export type RefreshTokenType = string | undefined;
export type AccessTokenType = string | undefined;

/**
 * decorator for getting the client ip and user agent
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

/**
 * decorator for getting the refresh token
 */
export const RefreshToken = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		return req.cookies["refreshToken"] as RefreshTokenType;
	},
);

/**
 * decorator for getting the access token
 */
export const AccessToken = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		return req.cookies["accessToken"] as AccessTokenType;
	},
);
