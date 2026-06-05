import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

import { AuthContext, AuthContextType } from "../auth/auth.decorators";
import { OAuthIdentity, OAuthIdentityType } from "./oauth.decorators";
import { OAuthService } from "./oauth.service";

@Controller("oauth")
export class OAuthController {
	constructor(private readonly oauthService: OAuthService) {}

	/**
	 * used to initiate the google authentication process
	 */
	@Get("google")
	@UseGuards(AuthGuard("google"))
	googleAuth() {}

	/**
	 * finished google authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	@Get("google/callback")
	@UseGuards(AuthGuard("google"))
	async googleCallback(
		@OAuthIdentity() identity: OAuthIdentityType,
		@AuthContext() ctx: AuthContextType,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.oauthService.callback(identity, ctx, response);
	}

	/**
	 * used to initiate the github authentication process
	 */
	@Get("github")
	@UseGuards(AuthGuard("github"))
	githubAuth() {}

	/**
	 * finished github authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	@Get("github/callback")
	@UseGuards(AuthGuard("github"))
	async githubCallback(
		@OAuthIdentity() identity: OAuthIdentityType,
		@AuthContext() ctx: AuthContextType,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.oauthService.callback(identity, ctx, response);
	}
}
