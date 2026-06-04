import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";
import { AuthService } from "./auth.service";
import { AuthDto, CodeDto } from "./dto/auth.dto";

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
		@Res({ passthrough: true }) response: Response,
	) {
		// authenticating
		const { accessToken, refreshToken, session, user } =
			await this.authService.login(body);

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
	async me(@Req() request: Request) {
		// getting and validating the refresh token
		const refreshToken = this.jwtService.decode({
			token: request.cookies["refreshToken"],
		});

		if (!refreshToken) {
			throw createException("unauthorized", "UNAUTHENTICATED");
		}

		return await this.authService.me(refreshToken);
	}

	/**
	 * logs out a specific session id, deleting the session
	 * @param sessionId id of the session to be deleted
	 * @returns null (if already logged out) or session
	 */
	@Delete("logout")
	async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
	) {
		// getting and decoding the token
		const refreshToken = this.jwtService.getAuthTokens({ request });
		const decoded = this.jwtService.decode({ token: refreshToken });

		if (!decoded) {
			return true;
		}

		// clearing the token
		this.jwtService.deleteAuthTokens({ response, type: "all" });

		// logging out
		return await this.authService.logout(decoded.sessionId);
	}
}
