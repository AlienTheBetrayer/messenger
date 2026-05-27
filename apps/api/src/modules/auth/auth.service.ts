import {
	AuthSchema,
	ForgotPasswordSchema,
	VerifySchema,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import bcrypt from "bcryptjs";
import { createException } from "../../common/index.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { VerifyService } from "../verify/verify.service.js";

/**
 * microtasks:
 *    register:
 * 1. ✅ check if user already exists
 * 2. ✅ generate a code with 60m. expiry (+db)
 * 3. ✅ send a confirmation email with that code
 * 4. ✅ upon correct code:
 * 5. ✅ hash password
 * 6. ✅ create a user
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
 * 1. generate a code with 60m. expiry (+db)
 * 2. send a confirmation email with that code
 * 3. upon correct code enter show reset password form
 * 4. reset password
 */

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly verifyService: VerifyService,
	) {}

	async authSignup(body: AuthSchema, verification?: VerifySchema) {
		if (verification) {
			// 1. verifying the code
			await this.verifyService.validateCode({
				email: body.email,
				type: "signup",
				code: verification.code,
			});

			// 2. hashing password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(body.password, salt);

			// 3. creating the user
			const user = await this.prismaService.users.create({
				data: {
					email: body.email,
					password: hash,
				},
			});

			// 4. cleaning up the codes
			this.verifyService.cleanupCodes({ email: body.email, type: "signup" });

			return user;
		} else {
			// 1. already existing user check
			if (
				await this.prismaService.users.count({ where: { email: body.email } })
			) {
				throw createException("conflict", "USER_ALREADY_EXISTS");
			}

			// 2. create a verification code, send it via email
			return await this.verifyService.issueCode({
				email: body.email,
				type: "signup",
			});
		}
	}

	async authForgotPassword(
		body: ForgotPasswordSchema,
		verification?: VerifySchema,
	) {
		if (verification) {
		} else {
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

	async authSession() {
		return true;
	}
}
