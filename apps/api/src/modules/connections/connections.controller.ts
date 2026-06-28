import {
	ConnectionDeleteReturn,
	ConnectionInitReturn,
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

import { createException } from "../../common";
import {
	AuthenticatedUser,
	AuthenticatedUserType,
} from "../auth-core/decorators";
import { AuthenticatedGuard } from "../auth-core/guards";
import {
	ConnectionDeleteDto,
	ConnectionInitDto,
	GroupCreateDto,
	GroupDeleteDto,
	GroupEditDto,
} from "./connections.dto";
import { ConnectionsService } from "./connections.service";
import { GroupOwnerGuard } from "./guards";

@Controller("connections")
export class ConnectionsController {
	constructor(private readonly connectionsService: ConnectionsService) {}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	@UseGuards(AuthenticatedGuard)
	@Get()
	async connections(
		@AuthenticatedUser() user: AuthenticatedUserType,
	): Promise<ConnectionsReturn> {
		const connections = await this.connectionsService.connections(
			user.session.id,
		);
		return { connections };
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Delete("connection/delete")
	async connectionelete(
		@Body() body: ConnectionDeleteDto,
	): Promise<ConnectionDeleteReturn> {
		const connected_session =
			await this.connectionsService.connectionDelete(body);
		return { connected_session };
	}

	@UseGuards(AuthenticatedGuard, GroupOwnerGuard)
	@Get("connection/init")
	async connectionInit(
		@Query() query: ConnectionInitDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<ConnectionInitReturn> {
		switch (query.type) {
			case "oauth": {
				if (!query.service) {
					throw createException(
						"badrequest",
						"INVALID_BODY",
						"service is required for oauth connection.",
					);
				}

				response.redirect(
					`http://localhost:3001/oauth/${query.service}?action=connect&groupId=${query.groupId}`,
				);
				break;
			}
			case "auth": {
				break;
			}
		}
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
