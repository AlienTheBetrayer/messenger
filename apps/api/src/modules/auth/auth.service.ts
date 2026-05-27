import { AuthSchema } from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import { MailService } from "../mail/mail.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { createException } from "../../common/index.js";
import { generateVerificationEmail } from "../mail/lib/constants.js";
import bcrypt from "bcryptjs";

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
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
	) {}

	async authSignup(body: AuthSchema, verificationCode?: string) {
		if (verificationCode) {
			// 1. verifying the code
			const code = await this.prisma.verification_codes.findFirst({
				where: {
					email: body.email,
					expiry_at: {
						gte: new Date(),
					},
				},
			});

			if (!code || code.code !== verificationCode) {
				throw createException("unauthorized", "INVALID_VERIFICATION_CODE");
			}

			// 2. hashing password
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(body.password, salt);

			// 3. creating the user
			const user = await this.prisma.users.create({
				data: {
					email: body.email,
					password: hash,
				},
			});

			// 4. cleaning up the codes
			this.prisma.verification_codes.deleteMany({
				where: {
					email: body.email,
				},
			});

			return user;
		} else {
			// 1. already existing user check
			if (await this.prisma.users.count({ where: { email: body.email } })) {
				throw createException("conflict", "USER_ALREADY_EXISTS");
			}

			// 2. create a verification code
			const code = await this.prisma.verification_codes.create({
				data: {
					code: `${Math.random().toString().slice(2, 8)}`,
					email: body.email,
					type: "login",
					expiry_at: new Date(Date.now() + 30 * 60 * 1000),
				},
			});

			// 3. send it via email
			await this.mailService.send({
				to: body.email,
				html: generateVerificationEmail(code.code),
				subject: `Verification code`,
			});

			return code;
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
