import {
	AuthCodeReturn,
	AuthForgotPasswordReturn,
	AuthLoginReturn,
	AuthLogoutReturn,
	AuthMeReturn,
	AuthSignupReturn,
	generateId,
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
import {
	AuthContext,
	AuthContextType,
	AuthenticatedUser,
	AuthenticatedUserType,
	RefreshToken,
	RefreshTokenType,
} from "../auth-core/decorators";
import { AuthenticatedGuard, NotAuthenticatedGuard } from "../auth-core/guards";
import { ConnectionsService } from "../connections/connections.service";
import { AppJwtService } from "../jwt/jwt.service";
import { AuthCodeDto, AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: AppJwtService,
		private readonly connectionsService: ConnectionsService,
	) {}

	/**
	 * validates and sends an authentication code via email
	 * @param email email to issue the code to
	 * @returns true if the code was generated
	 */
	@UseGuards(NotAuthenticatedGuard)
	@Post("code")
	async code(@Body() body: AuthCodeDto): Promise<AuthCodeReturn> {
		await this.authService.code(body);
		return true;
	}

	/**
	 * signs the user up. (throws if already authenticated)
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns user object
	 */
	@UseGuards(NotAuthenticatedGuard)
	@Post("signup")
	async signup(@Body() body: AuthDto): Promise<AuthSignupReturn> {
		const user = await this.authService.signup(body);
		return user;
	}

	/**
	 * authenticates the user. (throws if already authenticated)
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns authentication tokens, user and a session
	 */
	@UseGuards(NotAuthenticatedGuard)
	@Post("login")
	async login(
		@Body() body: AuthDto,
		@AuthContext() ctx: AuthContextType,
		@Res({ passthrough: true }) response: Response,
	): Promise<AuthLoginReturn> {
		// authenticating
		const { accessToken, refreshToken, session, user } =
			await this.authService.login(body, ctx);

		switch (body.action) {
			case "connect": {
				if (!body.actionMetadata) {
					throw createException(
						"badrequest",
						"INVALID_BODY",
						"actionMetadata is required in body",
					);
				}

				await this.connectionsService.connectionAdd({
					session,
					groupId: body.actionMetadata.groupId,
					connectionId: body.actionMetadata.connectionId ?? generateId(),
				});
				break;
			}
			default: {
				this.jwtService.setAuthHttpCookies({
					accessToken,
					refreshToken,
					response,
				});
				break;
			}
		}

		return { accessToken, refreshToken, session, user };
	}

	/**
	 * changes the password.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns new user object
	 */
	@UseGuards(NotAuthenticatedGuard)
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
	@UseGuards(AuthenticatedGuard)
	@Get("me")
	me(@AuthenticatedUser() user: AuthenticatedUserType): AuthMeReturn {
		const { session, ...userObject } = user;
		return { session, user: userObject };
	}

	/**
	 * logs out currently logged in session. (throws if not authenticated)
	 * @param refreshToken current logged in refresh token
	 * @returns succesful log out should return a session
	 */
	@UseGuards(AuthenticatedGuard)
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
