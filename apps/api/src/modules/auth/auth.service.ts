import { AuthSchema } from '@gravity/shared';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { createException } from '../../common/index.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

/**
 * microtasks: ✅
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

	async authRegister(body: AuthSchema) {
		// 1. user duplication checking
		if (await this.prisma.users.count({ where: { email: body.email } })) {
			throw createException('conflict', 'USER_ALREADY_EXISTS');
		}

		// 2. user creation
		// password encryption
		const salt = await bcrypt.genSalt();
		const password = await bcrypt.hash(body.password, salt);

		// other
		const id = crypto.randomUUID();

		// user creation
		const user = await this.prisma.users.create({
			data: { id, email: body.email, password },
		});

		return user;
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
		await this.mailService.send('alienthebusinessman@gmail.com');
		return true;
	}
}
