import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthenticationDto, VerificationCodeDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	async authRegister(
		@Body() body: AuthenticationDto,
		@Query("code") code?: VerificationCodeDto,
	) {
		return await this.authService.authSignup(
			{
				email: body.email,
				password: body.password,
			},
			code,
		);
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
