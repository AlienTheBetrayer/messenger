import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { AuthContext, AuthContextType } from "../auth-core/decorators";
import { NotAuthenticatedGuard } from "../auth-core/guards";
import { AuthenticationFailureRedirect } from "../auth-core/metadata/auth.metadata";
import {
	OAuthIdentity,
	OAuthIdentityType,
} from "./decorators/oauthidentity.decorator";
import { GithubGuard, GoogleGuard } from "./guards";
import { OAuthService } from "./oauth.service";
import { redirectErrorURL } from "./oauth.types";

@Controller("oauth")
export class OAuthController {
	constructor(private readonly oauthService: OAuthService) {}

	/**
	 * used to initiate the google authentication process
	 */
	@Get("google")
	@AuthenticationFailureRedirect(redirectErrorURL("AUTHENTICATED"))
	@UseGuards(GoogleGuard, NotAuthenticatedGuard)
	googleAuth() {}

	/**
	 * finished google authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	@AuthenticationFailureRedirect(redirectErrorURL("AUTHENTICATED"))
	@Get("google/callback")
	@UseGuards(GoogleGuard, NotAuthenticatedGuard)
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
	@AuthenticationFailureRedirect(redirectErrorURL("AUTHENTICATED"))
	@Get("github")
	@UseGuards(GithubGuard, NotAuthenticatedGuard)
	githubAuth() {}

	/**
	 * finished github authentication session
	 * @param request request object
	 * @param response response object
	 * @returns redirects the user back to the frontend
	 */
	@AuthenticationFailureRedirect(redirectErrorURL("AUTHENTICATED"))
	@Get("github/callback")
	@UseGuards(GithubGuard, NotAuthenticatedGuard)
	async githubCallback(
		@OAuthIdentity() identity: OAuthIdentityType,
		@AuthContext() ctx: AuthContextType,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.oauthService.callback(identity, ctx, response);
	}
}
