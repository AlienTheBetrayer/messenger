import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ConnectionLoginGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		// parsing fields
		const parsedFields = z.safeParse(
			z.looseObject({
				connectionId: z.nanoid(),
			}),
			{ ...request.body, ...request.query },
		);

		if (!parsedFields.success) {
			throw createException(
				"badrequest",
				"INVALID_BODY",
				"no connectionId found in the body.",
			);
		}

		const { connectionId } = parsedFields.data;

		// if it's an owner, reject
		const connection = await this.prismaService.connections.findFirst({
			where: {
				id: connectionId,
			},
			include: {
				connections_group: true,
			},
		});

		if (!connection) {
			throw createException(
				"notfound",
				"FIELD_NOT_FOUND",
				"connection was not found in the database.",
			);
		}

		if (connection.connections_group.owner_user_id === connection.user_id) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you cannot login as the owner of the group.",
			);
		}

		return true;
	}
}
