import { AuthRequestSchema } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import { createException } from "../../common/index.js";
import { JwtService } from "../jwt/jwt.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { VerifyService } from "../verify/verify.service.js";

/**
 * NEW microtasks ✅
 *
 * register:
 * 1. fix FE validation
 * 2. ensure it works
 *
 * login:
 * 1. FE sends a request /api/login
 * 2. BE sends the code
 * 3. FE requests /api/login?code=000000
 * 4. BE validates the user
 * 5. FE handles response + if succeded: stores user globally + shows animation
 * 6. BE if succeded: creates a new session
 * 7. BE issues Access and Refresh(attached to that session) tokens
 *
 *
 * forgot password:
 * 0. FE add password field and change schemas
 * 1. FE requests /api/forgot-password code
 * 2. BE sends the code
 * 3. FE requests /api/forgot-password?code=000000
 * 4. BE changes the password
 * 5. FE shows animated login button
 *
 * forgot email:
 * 0. FE requests /api/forgot-email?email=m@...
 * 1. BE route retrieves sessions from refresh token
 * 2. FE shows it (or absense warning)
 * 3. FE copy buttons
 *
 * request cycle:
 * 1. FE sends a request
 * 2. BE guard checks the refresh token and passes if it's present, rejects if not
 * 3. BE guard attaches a flag if refresh's there but access token is not
 * 4. BE interceptor attaches a new access token if flag is present
 */

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly verifyService: VerifyService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * no code: sends the signup code. code: creates the user.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns code or user
	 */
	async authSignup(body: AuthRequestSchema) {
		if (body.code) {
			// verifying the code
			await this.verifyService.validateCode({
				email: body.email,
				type: "signup",
				code: body.code,
			});

			// hashing the password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(body.password, salt);

			// creating the user
			const user = await this.prismaService.users.create({
				data: {
					email: body.email,
					password: hash,
				},
			});

			return user;
		} else {
			// does the user already exist?
			if (
				await this.prismaService.users.count({ where: { email: body.email } })
			) {
				throw createException("conflict", "USER_ALREADY_EXISTS");
			}

			// create a verification code, send it via email
			return await this.verifyService.issueCode({
				email: body.email,
				type: "signup",
			});
		}
	}

	/**
	 * no code: sends the login code. code: authenticated the user.
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @param request request object
	 * @param response response object
	 * @returns code or user
	 */
	async authLogin(
		body: AuthRequestSchema,
		request: Request,
		response: Response,
	) {
		// does the user already exist?
		const user = await this.prismaService.users.findFirst({
			where: { email: body.email },
		});

		if (!user) {
			throw createException("notfound", "USER_NOT_FOUND");
		}

		// do passwords' hashes match?
		const isPasswordCorrect = await bcrypt.compare(
			body.password,
			user.password,
		);

		if (!isPasswordCorrect) {
			throw createException("unauthorized", "INVALID_CREDENTIALS");
		}

		if (body.code) {
			// verifying the code
			await this.verifyService.validateCode({
				email: body.email,
				type: "login",
				code: body.code,
			});

			// tokens + session + hashing
			await this.jwtService.createAuthSession({
				request,
				response,
				userId: user.id,
			});

			return user;
		} else {
			// create a verification code, send it via email
			return await this.verifyService.issueCode({
				email: body.email,
				type: "login",
			});
		}
	}

	/**
	 * no code: sends the forgot-password code. code: changes the password
	 * @param email email address (required)
	 * @param password password (required, will be hashed)
	 * @param code (optional, used to verify)
	 * @returns code or user
	 */
	async authForgotPassword(body: AuthRequestSchema) {
		// does this email exist?
		if (
			!(await this.prismaService.users.count({
				where: { email: body.email },
			}))
		) {
			throw createException("notfound", "USER_NOT_FOUND");
		}

		if (body.code) {
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
		} else {
			// create a verification code, send it via email
			return await this.verifyService.issueCode({
				email: body.email,
				type: "forgot_password",
			});
		}
	}

	/**
	 * attempts to retrieve the last used email from the authenticated session
	 * @param request request object
	 * @returns retrieved email or nothing
	 */
	async authForgotEmail(request: Request) {
		return await Promise.resolve(() => [request]);
	}

	/**
	 * gets the currently logged in user (yourself)
	 * @param request request object
	 * @returns user object of currently logged in user
	 */
	async authMe(request: Request) {
		// getting the token
		const refreshToken = this.jwtService.decode({ request, type: "refresh" });

		if (!refreshToken) {
			throw createException("unauthorized", "UNAUTHENTICATED");
		}

		// // verifying the session
		// const session = await this.prismaService.auth_session.findFirst({
		// 	where: { id: refreshToken.payload.sessionId },
		// });

		// if (!session) {
		// 	throw createException("unauthorized", "UNAUTHENTICATED");
		// }

		// // verifying hashes
		// const isRefreshTokenCorrect = await bcrypt.compare(
		// 	refreshToken.token,
		// 	session.refresh_token_hash,
		// );

		// if (!isRefreshTokenCorrect) {
		// 	throw createException("unauthorized", "UNAUTHENTICATED");
		// }

		// getting the user
		const user = await this.prismaService.users.findFirst({
			where: { id: refreshToken.payload.user_id },
		});

		return user;
	}

	/**
	 * logs out the current user, deleting the session
	 * @param request request object
	 * @param response response object
	 * @returns null (if already logged out) or session
	 */
	async authLogout(request: Request, response: Response) {
		// getting the token
		const refreshToken = this.jwtService.decode({ request, type: "refresh" });

		if (!refreshToken) {
			return null;
		}

		// deleting the token
		this.jwtService.delete({ response, type: "all" });

		// deleting the session
		const session = await this.prismaService.auth_session.delete({
			where: { id: refreshToken.payload.sessionId },
		});

		return session;
	}
}
