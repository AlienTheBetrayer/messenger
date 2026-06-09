import { AuthSchema, CodeSchema } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

import { createException } from "../../common/index.js";
import { JwtService } from "../jwt/jwt.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { UserService } from "../user/user.service.js";
import { VerifyService } from "../verify/verify.service.js";
import { AuthContextType, RefreshTokenType } from "./auth.decorators.js";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly verifyService: VerifyService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	/**
	 * validates and sends an authentication code via email
	 * @param email email to issue the code to
	 * @returns newly generated code (also sent to email) if validated
	 */
	async code(body: CodeSchema) {
		// validating
		switch (body.type) {
			case "signup": {
				// does the user exist?
				if (
					await this.prismaService.users.count({ where: { email: body.email } })
				) {
					throw createException("conflict", "USER_ALREADY_EXISTS");
				}

				break;
			}
			default: {
				// does the eamil exist?
				if (
					!(await this.prismaService.users.count({
						where: { email: body.email },
					}))
				) {
					throw createException("notfound", "USER_NOT_FOUND");
				}

				break;
			}
		}

		// issuing the code
		const code = await this.verifyService.issueCode(body);
		return code;
	}

	/**
	 * signs the user up
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns user object
	 */
	async signup(body: AuthSchema) {
		// verifying the code
		await this.verifyService.validateCode({
			email: body.email,
			type: "signup",
			code: body.code,
		});

		// creating the user
		const user = await this.userService.create({
			email: body.email,
			password: body.password,
		});

		return user;
	}

	/**
	 * authenticates the user.
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @returns authentication tokens, user and a session
	 */
	async login(body: AuthSchema, ctx: AuthContextType) {
		// verifying the code
		await this.verifyService.validateCode({
			email: body.email,
			type: "login",
			code: body.code,
		});

		// does the user already exist?
		const user = await this.prismaService.users.findFirst({
			where: { email: body.email },
		});

		if (!user?.password) {
			throw createException("notfound", "USER_NOT_FOUND");
		}

		// do password hashes match?
		const isPasswordCorrect = await bcrypt.compare(
			body.password,
			user.password,
		);

		if (!isPasswordCorrect) {
			throw createException("unauthorized", "INVALID_CREDENTIALS");
		}

		return {
			...(await this.jwtService.issueAuthData({ userId: user.id, ctx })),
			user,
		};
	}

	/**
	 * changes the password
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns new user object
	 */
	async forgotPassword(body: AuthSchema) {
		// verifying the code
		await this.verifyService.validateCode({
			email: body.email,
			type: "forgot_password",
			code: body.code,
		});

		// hashing the new password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(body.password, salt);

		// changing user's data
		const user = await this.prismaService.users.update({
			where: {
				email: body.email,
			},
			data: {
				password: hash,
			},
		});

		return user;
	}

	/**
	 * gets the currently logged in user (yourself)
	 * @param refreshToken refresh token
	 * @returns user object along with the session of currently logged in user
	 */
	async me(refreshToken: RefreshTokenType) {
		// checking token
		if (!refreshToken) {
			throw createException("unauthorized", "UNAUTHENTICATED");
		}

		// validating token
		const verified = this.jwtService.verify({
			token: refreshToken,
			key: "REFRESH_TOKEN_SECRET",
		});

		// database validating
		const isFound = await this.prismaService.auth_session.count({
			where: {
				user_id: verified.userId,
			},
		});

		if (!isFound) {
			throw createException("unauthorized", "UNAUTHENTICATED");
		}

		// getting the user
		return await this.prismaService.users.findFirst({
			where: { id: verified.userId },
		});
	}

	/**
	 * logs out a specific session id, deleting the session
	 * @param sessionId id of the session to be deleted
	 * @returns succesful log out should return a session
	 */
	async logout(sessionId: string) {
		// check if it exists at all
		const isFound = await this.prismaService.auth_session.count({
			where: { id: sessionId },
		});

		if (!isFound) {
			return { message: "no user is found." };
		}

		// deleting the session
		const session = await this.prismaService.auth_session.delete({
			where: { id: sessionId },
		});

		return session;
	}
}
