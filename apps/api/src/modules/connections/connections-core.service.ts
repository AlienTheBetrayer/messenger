import { Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../common";
import { authenticatedUserSchema } from "../auth-core/decorators";
import { oAuthIdentitySchema } from "../auth-oauth/oauth.types";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConnectionsCoreService {
	constructor(private prismaService: PrismaService) {}

	async verifyMembership(request: Request) {
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
		const connections = await this.prismaService.connected_sessions.findMany({
			where: {
				group_id: parsedGroup.data.groupId,
				auth_sessions: {
					user_id: parsedUser.data.id,
				},
			},
			include: {
				connected_sessions_group: true,
			},
		});

		if (!connections.length) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you are not a member of this group.",
			);
		}

		// setting the group
		(request.user as typeof parsedUser.data).session.groups = connections.map(
			({ connected_sessions_group }) => connected_sessions_group,
		);

		return true;
	}

	async verifyOwnership(request: Request) {
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

	async verifyConnection(request: Request) {
		const identity = z.safeParse(oAuthIdentitySchema, request.user);

		if (!identity.success) {
			throw createException(
				"badrequest",
				"INVALID_BODY",
				"identity is invalid.",
			);
		}

		// if not connecting, let it pass
		if (identity.data.metadata.action !== "connect") {
			return true;
		}

		// email is required
		if (!identity.data.email) {
			throw createException(
				"notfound",
				"EMAIL_NOT_FOUND",
				"identity has no email attached.",
			);
		}

		// user by email
		const user = await this.prismaService.users.findFirst({
			where: {
				email: identity.data.email,
			},
    });
    
		if (!user) {
			throw createException(
				"notfound",
				"EMAIL_NOT_FOUND",
				"user was not found.",
			);
		}

		// any connected sessions with auth session with that id
		const isFound = await this.prismaService.connected_sessions.count({
			where: {
				group_id: identity.data.metadata.groupId,
				auth_sessions: {
					user_id: user.id,
				},
			},
    });
    
		if (isFound) {
			throw createException(
				"conflict",
				"AUTHENTICATED",
				"session is already connected.",
			);
		}

		return true;
	}
}
