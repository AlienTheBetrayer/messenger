import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { OAuthUser, OAuthUserSchema } from "./oauth.types";

@Injectable()
export class OAuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * finished google authentication session
	 * @param request request object
   * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	async googleCallback(request: Request, response: Response) {
		const parsed = await OAuthUserSchema.safeParseAsync(request.user);

		if (!parsed.success) {
			throw createException("badrequest", "INVALID_BODY");
		}

		await this.login(response, request, request.user as OAuthUser);
		response.redirect("http://localhost:3000/login");
	}

	/**
	 * oauth-specific login
	 * @param ouser user object retrieved from oauth
	 * @returns user object
	 */
	async login(response: Response, request: Request, ouser: OAuthUser) {
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

		// tokens + session + hashing
		await this.jwtService.createAuthSession({
			request,
			response,
			userId: user.id,
		});

		return user;
	}
}
