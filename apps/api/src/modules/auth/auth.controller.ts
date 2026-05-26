import { Controller, Delete, Get, Post, UseGuards, Body } from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async authRegister(@Body() body: RegisterDto) {
		return await this.authService.authRegister({
			email: body.email,
			password: body.password,
		});
	}

	@Post('login')
	authLogin() {
		this.authService.authLogin();
	}

	@Post('refresh')
	authRefresh() {
		this.authService.authRefresh();
	}

	@UseGuards(AuthGuard)
	@Delete('logout')
	authLogout() {
		this.authService.authLogout();
	}

	@UseGuards(AuthGuard)
	@Get('session')
	async authSession() {
		return await this.authService.authSession();
	}
}
