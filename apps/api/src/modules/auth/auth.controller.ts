import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";

import { JwtService } from "../jwt/jwt.service";
import {
  AuthContext,
  AuthContextType,
  RefreshToken,
  RefreshTokenType,
} from "./auth.decorators";
import { AuthDto, CodeDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * validates and sends an authentication code via email
	 * @param email email to issue the code to
	 * @returns true if the code was generated
	 */
	@Post("code")
	async code(@Body() body: CodeDto) {
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
	async signup(@Body() body: AuthDto) {
		return await this.authService.signup(body);
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
	) {
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
	async forgotPassword(@Body() body: AuthDto) {
		return await this.authService.forgotPassword(body);
	}

	/**
	 * gets the currently logged in user (yourself).
	 * @param refreshToken refresh token
	 * @returns user object along with the session of currently logged in user
	 */
	@Get("me")
	async me(@RefreshToken() refreshToken: RefreshTokenType) {
		return await this.authService.me(refreshToken);
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
	) {
		// validating tokens
		if (!refreshToken) {
			return { message: "no refresh token found." };
		}

		const decoded = this.jwtService.verify({
			token: refreshToken,
			key: "REFRESH_TOKEN_SECRET",
		});

		// clearing the token
		this.jwtService.deleteAuthTokens({ response, type: "all" });

		// logging out
		return await this.authService.logout(decoded.sessionId);
	}
}
