import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthConnectionsService {
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
					connected_sessions: true,
				},
			},
		);

		return sessions;
  }
  
  async add() {
    
  }

	async login() {
		return true;
	}
}
