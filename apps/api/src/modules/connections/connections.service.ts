import {
	ConnectionAddSchema,
	ConnectionCodeSchema,
	ConnectionCreateSchema,
	ConnectionDeleteSchema,
	ConnectionLoginSchema,
	generateId,
	GroupCreateSchema,
	GroupDeleteSchema,
	GroupEditSchema,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import { createException } from "../../common";
import { AuthService } from "../auth/auth.service";
import {
	AuthContextType,
	AuthenticatedUserType,
} from "../auth-core/decorators";
import { AppJwtService } from "../jwt/jwt.service";
import { PrismaService } from "../prisma/prisma.service";
import { VerifyService } from "../verify/verify.service";

@Injectable()
export class ConnectionsService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: AppJwtService,
		private readonly authService: AuthService,
		private readonly verifyService: VerifyService,
	) {}

	async connectionCode(body: ConnectionCodeSchema) {
		// getting the email
		const connection = await this.prismaService.connections.findFirst({
			where: {
				id: body.connectionId,
			},
			include: {
				users: true,
			},
		});

		if (!connection) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"connection not found.",
			);
		}

		await this.verifyService.issueCode({
			type: "owner_connect",
			email: connection.users.email,
		});

		return true;
	}

	async connectionLogin(
		body: ConnectionLoginSchema,
		ctx: AuthContextType,
		authenticatedUser: AuthenticatedUserType,
	) {
		// validating and getting the connection
		const foundConnection = await this.prismaService.connections.findFirst({
			where: {
				id: body.connectionId,
			},
			include: {
				users: true,
			},
		});

		if (!foundConnection) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"connection not found.",
			);
    }
    
    		// deleting the old session
		await this.prismaService.auth_sessions.delete({
			where: {
				id: authenticatedUser.session.id,
			},
    });
    

		// tokens + session issuing
		const { accessToken, refreshToken, session } =
			await this.jwtService.issueAuthData({
				userId: foundConnection.user_id,
				ctx,
				config: { createGroup: false },
			});

		const { users: user, ...connection } = foundConnection;
		return { accessToken, refreshToken, connection, user, session };
	}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @param id of the user
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	async connections(userId: string) {
		// getting the connection ids
		const groupIds = await this.prismaService.connections.findMany({
			where: {
				user_id: userId,
			},
			select: {
				group_id: true,
			},
		});

		// getting the sessions
		const connected = await this.prismaService.connections_group.findMany({
			where: {
				id: {
					in: groupIds.map(({ group_id }) => group_id),
				},
			},
			include: {
				connections: {
					include: {
						users: true,
					},
				},
			},
		});

		return connected;
	}

	/**
	 * adds the user for a connection
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @param groupId id of the group
	 * @param connectionId optional id of the connection
	 * @returns authentication tokens, user and a session
	 */
	async connectionAdd(body: ConnectionAddSchema, ctx: AuthContextType) {
		const { user } = await this.authService.loginVerify(
			{ password: body.password, code: body.code, email: body.email },
			ctx,
		);

		const { connection } = await this.connectionCreate({
			groupId: body.groupId,
			userId: user.id,
			connectionId: body.connectionId ?? generateId(),
		});

		return { user, connection };
	}

	/**
	 * creates a group that can link multiple sessions
	 * @param title required title
	 * @param emoji optional emoji
	 * @returns group
	 */
	async connectionCreate(body: ConnectionCreateSchema) {
		// checking if the connection already exists
		const isFound = await this.prismaService.connections.count({
			where: {
				user_id: body.userId,
				group_id: body.groupId,
			},
		});

		if (isFound) {
			throw createException(
				"conflict",
				"USER_ALREADY_EXISTS",
				"connection already exists.",
			);
		}

		// creating the connection
		const connection = await this.prismaService.connections.create({
			data: {
				id: body.connectionId ?? generateId(),
				user_id: body.userId,
				group_id: body.groupId,
			},
		});

		return { connection };
	}

	/**
	 * deletes the connection by its id (have to be an owner)
	 * @param connectionId id of the connection to delete
	 * @returns
	 */
	async connectionDelete(body: ConnectionDeleteSchema) {
		const connected_session = await this.prismaService.connections.delete({
			where: {
				id: body.connectionId,
			},
		});

		return connected_session;
	}

	/**
	 * creates a group that can link multiple sessions
	 * @param title required title
	 * @param emoji optional emoji
	 * @returns group
	 */
	async groupAdd(body: GroupCreateSchema, user: AuthenticatedUserType) {
		// group
		const group = await this.prismaService.connections_group.create({
			data: {
				id: body.groupId ?? generateId(),
				owner_user_id: user.id,
				title: body.title,
				emoji: body.emoji,
			},
		});

		// connection
		const connection = await this.prismaService.connections.create({
			data: {
				id: body.connectionId ?? generateId(),
				user_id: user.id,
				group_id: group.id,
			},
		});

		return { group, connection };
	}

	/**
	 * edits the group (works only if you're the owner)
	 * @param groupId id of the group
	 * @param title title
	 * @param emoji emoji
	 * @returns updated group
	 */
	async groupEdit(body: GroupEditSchema) {
		const group = await this.prismaService.connections_group.update({
			where: {
				id: body.groupId,
			},
			data: {
				title: body.title,
				emoji: body.emoji,
				edited_at: new Date().toISOString(),
			},
		});

		return group;
	}

	/**
	 * deletes a group (works only if you're the owner)
	 * @param groupId id of the group
	 * @returns deleted group
	 */
	async groupDelete(body: GroupDeleteSchema) {
		const group = await this.prismaService.connections_group.delete({
			where: {
				id: body.groupId,
			},
		});

		return group;
	}
}
