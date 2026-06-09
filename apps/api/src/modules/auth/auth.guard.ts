import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";

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
	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
	) {}

	async canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();

		if (!("accessToken" in request.cookies)) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"no access token found.",
			);
		}

		try {
			// verifying the access token
			const verified = this.jwtService.verify({
				token: request.cookies["accessToken"] as string,
				key: "ACCESS_TOKEN_SECRET",
			});

			// verifying the session
			const found = await this.prismaService.auth_session.count({
				where: { id: verified.sessionId, user_id: verified.userId },
			});

			if (!found) {
				throw new Error("session not found in the database.");
			}

			// setting user
			request.user ??= { id: verified.userId } satisfies AuthGuardUserType;

			return true;
		} catch (m: unknown) {
			const message = m instanceof Error ? m.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				message ?? "access token could not be verified.",
			);
		}
	}
}
