import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/identicon.json";
import {
	generateId,
	randomHex,
	UserCreateReturn,
	UserCreateSchema,
	UserDeleteSchema,
	UserEditSchema,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { createException } from "../../common";
import { normalizeString } from "../../common/lib/normalize";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * generates a safe username out of email that hasn't been taken
	 * @param body email
	 * @returns generated username
	 */
	async generateUsername(body: UserCreateSchema["email"]) {
		// normalizing
		const username = body.split("@")[0];
		const normalizedUsername = normalizeString(username);

		// not eixsting - return generated
		if (
			!(await this.prismaService.users.count({
				where: { username: normalizedUsername },
			}))
		) {
			return normalizedUsername;
		}

		// eixsting - find all
		const existing = await this.prismaService.users.findMany({
			where: {
				username: {
					startsWith: normalizedUsername,
				},
			},
			select: {
				username: true,
			},
		});

		// 64 attempts to generate a new username
		const taken = new Set(existing.map(({ username }) => username));

		for (let i = 0; i < 64; ++i) {
			const candidate = `${normalizedUsername}${nanoid(2)}`;

			if (!taken.has(candidate)) {
				return candidate;
			}
		}

		// rare fallback
		return `${normalizedUsername}${Date.now()}`;
	}

	/**`
	 * creates a new user (hashes the password)
	 * @param email email address
	 * @param password raw password
	 * @returns user object, throws if email already taken
	 */
	async create(body: UserCreateSchema): Promise<UserCreateReturn> {
		// check if user already exists
		const isFound = await this.prismaService.users.count({
			where: {
				email: body.email,
			},
		});

		if (isFound) {
			throw createException(
				"conflict",
				"USER_ALREADY_EXISTS",
				"email is already taken.",
			);
		}

		// password (optional hashing)
		let password = null;

		if (body.password) {
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(body.password, salt);
		}

		// cosmetics
		const color = randomHex();
		const style = new Style(definition);
		const avatar = new Avatar(style, {
			seed: body.email,
			rowColor: color,
		});

		// username
		const username =
			normalizeString(body.username ?? "") ||
			(await this.generateUsername(body.email));

		// creating the user
		const user = await this.prismaService.users.create({
			data: {
				id: body.userId ?? generateId(),
				username,
				email: body.email,
				password,
				color,
				image_url: avatar.toDataUri(),
			},
		});

		return { user };
	}

	/**
	 * deletes the user
	 * @param key key (id or email)
	 * @returns deleted user
	 */
	async delete(body: UserDeleteSchema) {
		return this.prismaService.users.delete({
			where: {
				id: body.userId,
			},
		});
	}

	async edit(body: UserEditSchema) {
		const { userId, ...fields } = body;

		return this.prismaService.users.update({
			where: {
				id: userId,
			},
			data: fields,
		});
	}
}
