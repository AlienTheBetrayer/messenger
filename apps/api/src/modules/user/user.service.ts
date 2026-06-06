import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/identicon.json";
import { randomHex } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";

import { createException } from "../../common";
import { PrismaService } from "../prisma/prisma.service";
import { UserSchema } from "./user.dto";

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	/**`
	 * creates a new user (hashes the password)
	 * @param email email address
	 * @param password raw password
	 * @returns user object, throws if email already taken
	 */
	async create(body: UserSchema) {
		// check if user already exists
		const isFound = await this.prismaService.users.count({
			where: {
				email: body.email,
			},
		});

		if (isFound) {
			throw createException("conflict", "USER_ALREADY_EXISTS");
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

		// creating the user
		const user = await this.prismaService.users.create({
			data: {
				email: body.email,
				password,
				color,
				image_url: avatar.toDataUri(),
			},
		});

		return user;
	}

	/**
	 * deletes the user
	 * @param key key (id or email)
	 * @returns deleted user
	 */
	async delete(key: { id: string } | { email: string }) {
		return this.prismaService.users.delete({
			where: key,
		});
	}
}
