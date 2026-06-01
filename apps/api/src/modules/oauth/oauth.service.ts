import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { OAuthIdentity, oAuthIdentitySchema } from "./oauth.types";

@Injectable()
export class OAuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * finished authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	async callback(request: Request, response: Response) {
		const parsed = await oAuthIdentitySchema.safeParseAsync(request.user);

		// handling error
		if (parsed.data?.error) {
			response.redirect(
				`http://localhost:3000/login?error=${parsed.data.error.toLowerCase()}`,
			);
		}

		// login upon success
		if (parsed.success) {
			await this.login(response, parsed.data);
		}

		response.redirect("http://localhost:3000/login");
	}

	/**
	 * oauth-specific login
	 * @param response response object
	 * @param ouser user object retrieved from oauth
	 * @returns user object
	 */
	async login(response: Response, ouser: OAuthIdentity) {
		// does the user have an email?
		if (!ouser.email) {
			throw createException("notfound", "EMAIL_NOT_FOUND");
		}

		// does the user already exist?
		let user = await this.prismaService.users.findFirst({
			where: {
				email: ouser.email,
			},
		});

		// user doesn't exist? - create
		if (!user) {
			user = await this.prismaService.users.create({
				data: {
					email: ouser.email,
					password: "SET IT TO NULL, CHANGE DB SCHEMA",
				},
			});
		}

		// tokens + hashing + session
		const tokens = await this.jwtService.issueAuthTokens({
			userId: user.id,
		});

		// cookies
		this.jwtService.setAuthHttpCookies({ ...tokens, response });

		return user;
	}
}
