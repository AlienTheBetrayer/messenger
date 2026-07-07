import { connectionLoginSchema } from "@gravity/shared";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { RequestParser } from "../../../common/lib/classes/parser";
import { PrismaService } from "../../prisma/prisma.service";
import { VerifyService } from "../../verify/verify.service";

@Injectable()
export class ConnectionLoginGuard implements CanActivate {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly verifyService: VerifyService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		// parsing
		const parser = new RequestParser(request);
		const { connectionId, code } = parser.body({
			connectionId: z.nanoid(),
			code: connectionLoginSchema.shape.code,
		});

		// getting the connection for metadata
		const connection = await this.prismaService.connections.findFirst({
			where: {
				id: connectionId,
			},
			include: {
				connections_group: true,
				users: true,
			},
		});

		if (!connection) {
			throw createException(
				"notfound",
				"FIELD_NOT_FOUND",
				"connection was not found in the database.",
			);
		}

		// if it's an owner, try to verify the code
		if (connection.connections_group.owner_user_id === connection.user_id) {
			if (!code) {
				throw createException(
					"unauthorized",
					"UNAUTHENTICATED",
					"you cannot login as the owner of the group.",
				);
			}

			try {
				await this.verifyService.validateCode({
					code,
					email: connection.users.email,
					type: "owner_connect",
				});
			} catch {
				throw createException(
					"unauthorized",
					"UNAUTHENTICATED",
					"owner connection code is invalid.",
				);
			}
		}

		return true;
	}
}
