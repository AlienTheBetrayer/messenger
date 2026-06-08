import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";

/**
 * schema + type for user set auth guard
 */
export const authGuardUserSchema = z.object({
	id: z.string(),
});
export type AuthGuardUserType = z.infer<typeof authGuardUserSchema>;

/**
 * auth guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();

		if (!("accessToken" in request.cookies)) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"no access token found.",
			);
		}

		// verifying
		try {
			const decoded = this.jwtService.verify({
				token: request.cookies["accessToken"] as string,
				key: "ACCESS_TOKEN_SECRET",
			});

			// setting user
			request.user ??= { id: decoded.userId } satisfies AuthGuardUserType;

			return true;
		} catch {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"access token could not be verified.",
			);
		}
	}
}
