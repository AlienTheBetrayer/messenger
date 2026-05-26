import {
	Controller,
	Delete,
	Get,
	Post,
	UseGuards,
	Body,
	Query,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	async authRegister(@Body() body: RegisterDto, @Query('code') code?: string) {
		return await this.authService.authSignup({
			email: body.email,
			password: body.password,
		}, code);
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
