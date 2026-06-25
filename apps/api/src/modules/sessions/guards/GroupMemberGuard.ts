import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { authenticatedUserSchema } from "../../auth-core/decorators";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GroupMemberGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		// parsing (ensuring groupId is there)
		const parsedGroup = z.safeParse(
			z.looseObject({
				groupId: z.nanoid(),
			}),
			request.body,
		);

		if (!parsedGroup.success) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"groupId is absent in the body.",
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

		// getting group membres
		const members = await this.prismaService.connected_sessions.findMany({
			where: {
				group_id: parsedGroup.data.groupId,
			},
			include: {
				auth_sessions: true,
			},
		});

		// checking membership
		const isMember = members.some(
			(member) => member.auth_sessions.user_id === parsedUser.data.id,
		);

		if (!isMember) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you are not a member of this group.",
			);
		}

		return true;
	}
}
