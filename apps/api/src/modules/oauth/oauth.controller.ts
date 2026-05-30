import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

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
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.oauthService.callback(request, response);
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
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		await this.oauthService.callback(request, response);
	}
}
