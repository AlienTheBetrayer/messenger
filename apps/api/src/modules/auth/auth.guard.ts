import { usersType } from "@gravity/shared";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

import { createException } from "../../common";
import { AppJwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";

/**
 * auth guard
 */
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: AppJwtService,
		private readonly prismaService: PrismaService,
	) {}

	async canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();

		if (
			!("refreshToken" in request.cookies) ||
			!request.cookies["refreshToken"]
		) {
			throw new Error("no refrseh token found.");
		}

		try {
			// verifying the refresh token
			const verified = this.jwtService.verify({
				token: request.cookies["refreshToken"] as string,
				key: "REFRESH_TOKEN_SECRET",
			});

			// verifying the session
			const found = await this.prismaService.auth_session.findFirst({
				where: { id: verified.sessionId, user_id: verified.userId },
				include: { users: true },
			});

			if (!found) {
				throw new Error("session not found in the database.");
			}

			// setting user
			request.user ??= found.users satisfies usersType;

			return true;
		} catch (m: unknown) {
			const message = m instanceof Error ? m.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				message ?? "refresh token could not be verified.",
			);
		}
	}
}
