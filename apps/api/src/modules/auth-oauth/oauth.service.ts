import { usersType } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { createException } from "../../common";
import { AuthContextType } from "../auth-core/decorators";
import { ConnectionsService } from "../connections/connections.service";
import { AppJwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { OAuthIdentityType } from "./decorators";
import { redirectErrorURL } from "./oauth.types";

@Injectable()
export class OAuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: AppJwtService,
		private readonly userService: UserService,
		private readonly connectionsService: ConnectionsService,
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
				this.connectionsService.connectionAdd({
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
		let user = (await this.prismaService.users.findFirst({
			where: {
				email: identity.email,
			},
		})) as usersType;

		// user doesn't exist? - create
		if (!user) {
			user = (
				await this.userService.create({
					email: identity.email,
					username: identity.name,
					password: null,
				})
			).user;
		}

		// tokens + hashing + session
		const { accessToken, refreshToken, session } =
			await this.jwtService.issueAuthData({
				userId: user.id,
        ctx,
        action: identity.metadata.action ?? "login",
			});

		// authentication process
		switch (identity.metadata.action) {
      case "connect": {
				if (!identity.metadata.groupId) {
					throw createException(
						"badrequest",
						"INVALID_BODY",
						"groupId is required for the connection mode.",
					);
        }
        
				await this.connectionsService.connectionAdd({
					groupId: identity.metadata.groupId,
					session,
				});
				break;
			}
			default: {
				this.jwtService.setAuthHttpCookies({
					accessToken,
					refreshToken,
					response,
				});
				break;
			}
		}

		return { user, accessToken, refreshToken, session };
	}
}
