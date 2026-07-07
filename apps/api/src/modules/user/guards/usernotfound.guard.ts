import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { RequestParser } from "../../../common/lib/classes/parser";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserNotFoundGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		// parsing
		const parser = new RequestParser(request);
		const { userId } = parser.body({ userId: z.nanoid() });

		// validating
		const found = await this.prismaService.users.count({
			where: {
				id: userId,
			},
		});

		if (found) {
			throw createException(
				"conflict",
				"USER_ALREADY_EXISTS",
				`user is already present with ${userId}`,
			);
		}

		return true;
	}
}
