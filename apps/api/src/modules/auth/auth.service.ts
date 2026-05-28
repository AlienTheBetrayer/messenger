import { AuthRequestSchema } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

import { createException } from "../../common/index.js";
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
	) {}

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
				type: "signup",
			});
		}
	}

	authLogin() {
		return true;
	}

	authRefresh() {
		return true;
	}

	authLogout() {
		return true;
	}

	authSession() {
		return true;
	}
}
