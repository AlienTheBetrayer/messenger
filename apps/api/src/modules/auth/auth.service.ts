import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	authRegister(email: string, password: string) {
		this.prisma.users
			.create({ data: { email, password }, select: { id: true } })
			.then((res) => {
				console.warn(res.id);
			})
			.catch((err: unknown) => {
				console.error(err);
			});

		return { email, password };
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
