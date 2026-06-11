import {
	AuthCodeReturn,
	AuthForgotPasswordReturn,
	AuthLoginReturn,
	AuthLogoutReturn,
	AuthMeReturn,
	AuthSignupReturn,
} from "@gravity/shared";
import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";

import { createException } from "../../common";
import { AppJwtService } from "../jwt/jwt.service";
import {
	AuthContext,
	AuthContextType,
	AuthenticatedUser,
	AuthenticatedUserType,
	RefreshToken,
	RefreshTokenType,
} from "./auth.decorators";
import { AuthCodeDto, AuthDto } from "./auth.dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: AppJwtService,
	) {}

	/**
	 * validates and sends an authentication code via email
	 * @param email email to issue the code to
	 * @returns true if the code was generated
	 */
	@Post("code")
	async code(@Body() body: AuthCodeDto): Promise<AuthCodeReturn> {
		await this.authService.code(body);
		return true;
	}

	/**
	 * signs the user up
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns user object
	 */
	@Post("signup")
	async signup(@Body() body: AuthDto): Promise<AuthSignupReturn> {
		const user = await this.authService.signup(body);
		return { user };
	}

	/**
	 * authenticates the user.
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns authentication tokens, user and a session
	 */
	@Post("login")
	async login(
		@Body() body: AuthDto,
		@AuthContext() ctx: AuthContextType,
		@Res({ passthrough: true }) response: Response,
	): Promise<AuthLoginReturn> {
		// authenticating
		const { accessToken, refreshToken, session, user } =
			await this.authService.login(body, ctx);

		// cookies
		this.jwtService.setAuthHttpCookies({ accessToken, refreshToken, response });

		return { accessToken, refreshToken, session, user };
	}

	/**
	 * changes the password.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns new user object
	 */
	@Post("forgot-password")
	async forgotPassword(
		@Body() body: AuthDto,
	): Promise<AuthForgotPasswordReturn> {
		const user = await this.authService.forgotPassword(body);
		return { user };
	}

	/**
	 * gets the currently logged in user (yourself).
	 * @param refreshToken refresh token
	 * @returns user object
	 */
	@UseGuards(AuthGuard)
	@Get("me")
	me(@AuthenticatedUser() user: AuthenticatedUserType): AuthMeReturn {
		return { user };
	}

	/**
	 * logs out currently logged in session
	 * @param refreshToken current logged in refresh token
	 * @returns succesful log out should return a session
	 */
	@Delete("logout")
	async logout(
		@RefreshToken() refreshToken: RefreshTokenType,
		@Res({ passthrough: true }) response: Response,
	): Promise<AuthLogoutReturn> {
		// validating tokens
		if (!refreshToken) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"no refresh token. already logged out",
			);
		}

		const decoded = this.jwtService.verify({
			token: refreshToken,
			key: "REFRESH_TOKEN_SECRET",
		});

		// clearing the token
		this.jwtService.deleteAuthTokens({ response, type: "all" });

		// logging out
		const session = await this.authService.logout(decoded.sessionId);
		return { session };
	}
}
