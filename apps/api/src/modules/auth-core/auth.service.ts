import { usersType } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

import { AppJwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthCoreService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: AppJwtService,
	) {}

	/**
	 * verifies the authentication session from the request
	 * @param request  request object
	 * @returns true if verified, otherwise throws.
	 */
	async verify(request: Request) {
		// no refresh token found
		if (
			!("refreshToken" in request.cookies) ||
			!request.cookies["refreshToken"]
		) {
			throw new Error("no token found.");
		}

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
	}
}
