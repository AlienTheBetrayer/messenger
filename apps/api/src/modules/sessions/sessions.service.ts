import {
	generateId,
	GroupCreateSchema,
	GroupEditSchema,
	SessionAdd,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import { AuthenticatedUserType } from "../auth-core/decorators";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SessionsService {
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @param sessionId id of the "auth_sessions" session
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	async sessions(sessionId: string) {
		// getting the connection ids
		const groupIds = await this.prismaService.connected_sessions.findMany({
			where: {
				session_id: sessionId,
			},
			select: {
				group_id: true,
			},
		});

		// getting the sessions
		const sessions = await this.prismaService.connected_sessions_group.findMany(
			{
				where: {
					id: {
						in: groupIds.map(({ group_id }) => group_id),
					},
				},
				include: {
					connected_sessions: {
						include: {
							auth_sessions: {
								include: {
									users: true,
								},
							},
						},
					},
				},
			},
		);

		return sessions;
	}

	async add(body: SessionAdd) {
		return true;
	}

	async login() {
		return true;
	}

	/**
	 * creates a group that can link multiple sessions
	 * @param title required title
	 * @param emoji optional emoji
	 * @returns group
	 */
	async groupAdd(body: GroupCreateSchema, user: AuthenticatedUserType) {
		// group
		const group = await this.prismaService.connected_sessions_group.create({
			data: {
				id: body.groupId ?? generateId(),
				title: body.title,
				emoji: body.emoji,
			},
		});

		// connection
		const connection = await this.prismaService.connected_sessions.create({
			data: {
				id: body.connectionId ?? generateId(),
				session_id: user.session.id,
				group_id: group.id,
			},
		});

		return { group, connection };
	}

	/**
	 * edits the group (can only be a member of that group)
	 * @param title title
	 * @param emoji emoji
	 * @returns updated group
	 */
	async groupEdit(body: GroupEditSchema) {
		const group = await this.prismaService.connected_sessions_group.update({
			where: {
				id: body.groupId,
			},
			data: {
				title: body.title,
				emoji: body.emoji,
			},
		});

		return group;
	}
}
