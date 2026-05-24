import { Controller, Delete, Get, Post, UseGuards, Body } from '@nestjs/common';

import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')

	authRegister(@Body() body: RegisterDto) {
		this.authService.authRegister({
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
	authSession() {
		this.authService.authSession();
	}
}
