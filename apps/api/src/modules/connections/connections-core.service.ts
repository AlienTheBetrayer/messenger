import { connections_groupType, connectionsType } from "@gravity/shared";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { RequestParser } from "../../common/lib/classes/parser";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ConnectionsCoreService {
	constructor(private prismaService: PrismaService) {}

	/**
	 * validates whether you're a member/owner of the group by "groupId" in your body/query. (have to run after AuthGuards)
	 * @param request request object
	 * @param type type of the validation
	 * @returns true if validated, throws if otherwise
	 */
	async verifyGroup(request: Request, type: "membership" | "ownership") {
		// parsing
		const parser = new RequestParser(request);
		const user = parser.user();
		const group = parser.body({ groupId: z.nanoid() });

		let validated: connectionsType | connections_groupType | null = null;

		switch (type) {
			case "membership": {
				validated = await this.prismaService.connections.findFirst({
					where: {
						group_id: group.groupId,
						user_id: user.id,
					},
				});
				break;
			}
			case "ownership": {
				validated = await this.prismaService.connections_group.findFirst({
					where: {
						id: group.groupId,
						owner_user_id: user.id,
					},
				});
				break;
			}
		}

		if (!validated) {
			throw new Error("group has not been validatd.");
		}

		return true;
	}

	/**
	 * validates whether you're connected to a group you're trying to connect. (made for OAuth)
	 * @param request request object
	 * @returns true if validated, throws if otherwise
	 */
	async verifyOAuthConnection(request: Request) {
		// parsing
		const parser = new RequestParser(request);
		const identity = parser.identity();

		// if not connecting, let it pass
		if (identity.metadata.action !== "connect") {
			return true;
		}

		// email is required
		if (!identity.email) {
			throw new Error("identity has no email attached.");
		}

		// user by email
		const user = await this.prismaService.users.findFirst({
			where: {
				email: identity.email,
			},
		});

		if (!user) {
			return true;
		}

		// any connected sessions with that user id
		const isFound = await this.prismaService.connections.count({
			where: {
				group_id: identity.metadata.groupId,
				user_id: user.id,
			},
		});

		if (isFound) {
			throw new Error("session is already connected.");
		}

		return true;
	}

	/**
	 * validstea whether you're a member of the group by "connectionId" in your body/query. (have to run after AuthGuards)
	 * @param request request object
	 * @param type type of the validation
	 * @returns true if validated, throws if otherwise
	 */
	async verifyConnection(request: Request, type: "membership" | "ownership") {
		// parsing
		const parser = new RequestParser(request);
		const user = parser.user();
		const { connectionId } = parser.body({ connectionId: z.nanoid() });

		// getting the group
		const connection = await this.prismaService.connections.findFirst({
			where: {
				id: connectionId,
			},
		});

		if (!connection) {
			throw new Error("cannot find group by the connectionId.");
		}

		let validated: connectionsType | connections_groupType | null = null;

		switch (type) {
			case "membership": {
				validated = await this.prismaService.connections.findFirst({
					where: {
						group_id: connection.group_id,
						user_id: user.id,
					},
				});

				break;
			}
			case "ownership": {
				validated = await this.prismaService.connections_group.findFirst({
					where: {
						id: connection.group_id,
						owner_user_id: user.id,
					},
				});
				break;
			}
		}

		if (!validated) {
			throw new Error("connection has not been validated.");
		}

		return true;
	}
}
