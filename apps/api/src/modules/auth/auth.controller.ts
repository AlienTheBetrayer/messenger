import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthRequestDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * no code: sends the signup code. code: creates the user.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns code or user
	 */
	@Post("signup")
	async authSignup(@Body() body: AuthRequestDto) {
		return await this.authService.authSignup(body);
	}

	/**
	 * no code: sends the login code. code: authenticated the user.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @param request request object
	 * @param response response object
	 * @returns code or user
	 */
	@Post("login")
	async authLogin(
		@Body() body: AuthRequestDto,
		@Req() request: Request,
		@Res() response: Response,
	) {
		return await this.authService.authLogin(body, request, response);
	}

	/**
	 * no code: sends the forgot-password code. code: changes the password
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns code or user
	 */
	@Post("forgot-password")
	async authForgotPassword(@Body() body: AuthRequestDto) {
		return await this.authService.authForgotPassword(body);
	}

	/**
	 * attempts to retrieve the last used email from the authenticated session
	 * @param request request object
	 * @returns retrieved email or nothing
	 */
	@Post("forgot-email")
	async authForgotEmail(@Req() request: Request) {
		return await this.authService.authForgotEmail(request);
	}

	@Post("refresh")
	authRefresh() {
		this.authService.authRefresh();
	}

	@UseGuards(AuthGuard)
	@Delete("logout")
	authLogout() {
		this.authService.authLogout();
	}

	@UseGuards(AuthGuard)
	@Get("session")
	authSession() {
		return this.authService.authSession();
	}
}
