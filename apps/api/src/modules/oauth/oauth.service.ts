import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { createException } from "../../common";
import { AuthContextType } from "../auth/auth.decorators";
import { JwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { OAuthIdentityType } from "./oauth.decorators";

@Injectable()
export class OAuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	/**
	 * finished authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	async callback(
		identity: OAuthIdentityType,
		ctx: AuthContextType,
		response: Response,
	) {
		// handling error
		if (identity?.error) {
			response.redirect(
				`http://localhost:3000/login?error=${identity.error.toLowerCase()}`,
			);
		}

		// login upon success
		if (identity) {
			await this.login(identity, ctx, response);
		}

		response.redirect("http://localhost:3000/login");
	}

	/**
	 * oauth-specific login
	 * @param response response object
	 * @param ouser user object retrieved from oauth
	 * @returns user object
	 */
	async login(
		identity: OAuthIdentityType,
		ctx: AuthContextType,
		response: Response,
	) {
		// does the user have an email?
		if (!identity?.email) {
			throw createException("notfound", "EMAIL_NOT_FOUND");
		}

		// does the user already exist?
		let user = await this.prismaService.users.findFirst({
			where: {
				email: identity.email,
			},
		});

		// user doesn't exist? - create
		if (!user) {
			user = await this.userService.create({
				email: identity.email,
				password: null,
			});
		}

		// tokens + hashing + session
		const tokens = await this.jwtService.issueAuthData({
			userId: user.id,
			ctx,
		});

		// cookies
		this.jwtService.setAuthHttpCookies({ ...tokens, response });

		return user;
	}
}
