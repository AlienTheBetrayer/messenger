import {
	ConnectionAddReturn,
	ConnectionDeleteReturn,
	ConnectionInitReturn,
	ConnectionLoginReturn,
	ConnectionsReturn,
	GroupCreateReturn,
	GroupDeleteReturn,
	GroupEditReturn,
} from "@gravity/shared";
import {
	Body,
	Controller,
	Delete,
	Get,
	Patch,
	Post,
	Query,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";

import {
	AuthContext,
	AuthContextType,
	AuthenticatedUser,
	AuthenticatedUserType,
} from "../auth-core/decorators";
import { AuthenticatedGuard } from "../auth-core/guards";
import { AppJwtService } from "../jwt/jwt.service";
import {
	ConnectionAddDto,
	ConnectionDeleteDto,
	ConnectionInitDto,
	ConnectionLoginDto,
	GroupCreateDto,
	GroupDeleteDto,
	GroupEditDto,
} from "./connections.dto";
import { ConnectionsService } from "./connections.service";
import {
	ConnectionMemberGuard,
	ConnectionOwnerGuard,
	GroupMemberGuard,
	GroupOwnerGuard,
} from "./guards";

@Controller("connections")
export class ConnectionsController {
	constructor(
		private readonly connectionsService: ConnectionsService,
		private readonly jwtService: AppJwtService,
	) {}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	@UseGuards(AuthenticatedGuard)
	@Get()
	async connections(
		@AuthenticatedUser() user: AuthenticatedUserType,
	): Promise<ConnectionsReturn> {
		const groups = await this.connectionsService.connections(user.id);
		return { groups };
	}

	/**
	 * relogins you with a different connection. (only works if you're a member of it)
	 * @param connectionId id of the connection
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard, ConnectionMemberGuard)
	@Post("connection/login")
	async connectionLogin(
		@Body() body: ConnectionLoginDto,
		@AuthContext() ctx: AuthContextType,
		@AuthenticatedUser() authenticatedUser: AuthenticatedUserType,
		@Res({ passthrough: true }) response: Response,
	): Promise<ConnectionLoginReturn> {
		// validating + creating the session/tokens
		const { accessToken, refreshToken, connection, session, user } =
			await this.connectionsService.connectionLogin(
				body,
				ctx,
				authenticatedUser,
			);

		// setting tokens
		this.jwtService.setAuthHttpCookies({
			accessToken,
			refreshToken,
			response,
		});

		return { accessToken, refreshToken, session, connection, user };
	}

	/**
	 * adds the user for a connection. (does not authenticate)
	 * @param email email address
	 * @param password secure password
	 * @param code code that was sent to email (use /code/)
	 * @param groupId id of the group
	 * @param connectionId optional id of the connection
	 * @returns authentication tokens, user and a session
	 */
	@UseGuards(AuthenticatedGuard, GroupMemberGuard)
	@Post("connection/add")
	async connectionAdd(
		@Body() body: ConnectionAddDto,
		@AuthContext() ctx: AuthContextType,
	): Promise<ConnectionAddReturn> {
		// authenticating
		const ret = await this.connectionsService.connectionAdd(body, ctx);
		return ret;
	}

	/**
	 * deletes the connection by its id (have to be an owner)
	 * @param connectionId id of the connection to delete
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard, ConnectionOwnerGuard)
	@Delete("connection/delete")
	async connectionDelete(
		@Body() body: ConnectionDeleteDto,
	): Promise<ConnectionDeleteReturn> {
		const connection = await this.connectionsService.connectionDelete(body);
		return { connection };
	}

	/**
	 * @param service service to authenticate
	 * @param groupId id of the group
	 */
	@UseGuards(AuthenticatedGuard, GroupOwnerGuard)
	@Get("connection/init")
	async connectionInit(
		@Query() query: ConnectionInitDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<ConnectionInitReturn> {
		response.redirect(
			`http://localhost:3001/oauth/${query.service}?action=connect&groupId=${query.groupId}`,
		);
	}

	/**
	 * creates a group that can link multiple sessions
	 * @param title required title
	 * @param emoji optional emoji
	 * @returns group
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("group/add")
	async groupAdd(
		@Body() body: GroupCreateDto,
		@AuthenticatedUser() user: AuthenticatedUserType,
	): Promise<GroupCreateReturn> {
		const data = await this.connectionsService.groupAdd(body, user);
		return data;
	}

	/**
	 * edits the group (works only if you're the owner)
	 * @param groupId id of the group
	 * @param title title
	 * @param emoji emoji
	 * @returns updated group
	 */
	@UseGuards(AuthenticatedGuard, GroupOwnerGuard)
	@Patch("group/edit")
	async groupEdit(@Body() body: GroupEditDto): Promise<GroupEditReturn> {
		const group = await this.connectionsService.groupEdit(body);
		return { group };
	}

	/**
	 * deletes a group (works only if you're the owner)
	 * @param groupId id of the group
	 * @returns deleted group
	 */
	@UseGuards(AuthenticatedGuard, GroupOwnerGuard)
	@Delete("group/delete")
	async groupDelete(@Body() body: GroupDeleteDto): Promise<GroupDeleteReturn> {
		const group = await this.connectionsService.groupDelete(body);
		return { group };
	}
}
