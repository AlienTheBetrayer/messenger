import { Controller, Delete, Get, Post, UseGuards, Body } from '@nestjs/common';

import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';

import type { RegisterDto } from './dto/auth.dto.js';

/**
 * microtasks:
 *    register:
 * 1. check if user already exists
 * 2. generate a code with 60m. expiry (+db)
 * 3. send a confirmation email with that code
 * 4. upon correct code:
 * 5. hash password
 * 6. create a user
 *
 *
 *    login:
 * 1. validate hash password
 * 2. generate a code with 60m. expiry (+db)
 * 3. send a confirmation email with that code
 * 4. upon correct code enter:
 * 5. create db session
 * 6. issue an access token
 * 7. issue a refresh token
 * 8. attach tokens to http-only cookies
 * 9. return user
 *
 *
 *     request auth guard
 * 1. validate refresh token (db session + presense) = pass / reject
 * 2. attach a special flag if access token is not present (refresh token is present)
 * 3. interceptor sees that flag -> attaches a new A
 *
 *    forgot password?
 * 1.
 */
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
