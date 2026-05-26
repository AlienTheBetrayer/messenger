import { AuthSchema } from '@gravity/shared';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { createException } from '../../common/lib/exception.js';
import { MailService } from '../mail/mail.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

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
