import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthRequestDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	async authRegister(@Body() body: AuthRequestDto) {
		return await this.authService.authSignup(body);
	}

	@Post("forgot-password")
	async authForgotPassword(@Body() body: AuthRequestDto) {
		return await this.authService.authForgotPassword(body);
	}

	@Post("login")
	authLogin() {
		this.authService.authLogin();
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
	async authSession() {
		return await this.authService.authSession();
	}
}
