import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { createException } from "../../common";
import { AuthContextType } from "../auth-core/decorators";
import { AppJwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { SessionsService } from "../sessions/sessions.service";
import { UserService } from "../user/user.service";
import { OAuthIdentityType } from "./decorators";
import { redirectErrorURL } from "./oauth.types";

@Injectable()
export class OAuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: AppJwtService,
		private readonly userService: UserService,
		private readonly sessionsService: SessionsService,
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
			response.redirect(redirectErrorURL(identity.error));
		}

		// login upon success
		if (identity) {
			const { session } = await this.login(identity, ctx, response);

			if (identity.metadata.action === "connect" && identity.metadata.groupId) {
				this.sessionsService.add({
					session,
					groupId: identity.metadata.groupId,
				});
			}
		}

		response.redirect("http://localhost:3000/login");
	}

	/**
	 * oauth-specific login
	 * @param response response object
	 * @param ouser user object retrieved from oauth
	 * @returns user object and tokens + session
	 */
	async login(
		identity: OAuthIdentityType,
		ctx: AuthContextType,
		response: Response,
	) {
		// does the user have an email?
		if (!identity?.email) {
			throw createException(
				"notfound",
				"EMAIL_NOT_FOUND",
				"identity has no email attached.",
			);
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

		// cookies (connect mode disables it)
		if (identity.metadata.action !== "connect") {
			this.jwtService.setAuthHttpCookies({ ...tokens, response });
		}

		return { user, ...tokens };
	}
}
