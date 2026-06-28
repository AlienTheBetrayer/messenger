import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { authenticatedUserSchema } from "../../auth-core/decorators";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GroupOwnerGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		// parsing (ensuring groupId is there)
		const parsedGroup = z.safeParse(
			z.looseObject({
				groupId: z.nanoid(),
			}),
			{
				...request.body,
				...request.query,
			},
		);

		if (!parsedGroup.success) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"groupId is invalid in the body.",
			);
		}

		// parsing 2 (ensuring the user is even there)
		const parsedUser = z.safeParse(authenticatedUserSchema, request.user);

		if (!parsedUser.success) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you are not authenticated.",
			);
		}

		// getting connections
		const group = await this.prismaService.connected_sessions_group.findFirst({
			where: {
				id: parsedGroup.data.groupId,
				owner_user_id: parsedUser.data.id,
			},
		});

		if (!group) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you are not an owner of the group.",
			);
		}

		return true;
	}
}
