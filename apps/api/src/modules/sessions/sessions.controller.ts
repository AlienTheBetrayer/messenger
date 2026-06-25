import {
	GroupCreateReturn,
	GroupEditReturn,
	SessionsReturn,
} from "@gravity/shared";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import {
	AuthenticatedUser,
	AuthenticatedUserType,
} from "../auth-core/decorators";
import { AuthenticatedGuard } from "../auth-core/guards";
import { GroupMemberGuard } from "./guards";
import { GroupCreateDto, GroupEditDto } from "./sessions.dto";
import { SessionsService } from "./sessions.service";

@Controller("sessions")
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	@UseGuards(AuthenticatedGuard)
	@Get()
	async sessions(
		@AuthenticatedUser() user: AuthenticatedUserType,
	): Promise<SessionsReturn> {
		const sessions = await this.sessionsService.sessions(user.session.id);
		return { sessions };
	}

	// /**
	//  *
	//  * @returns
	//  */
	// @UseGuards(AuthenticatedGuard)
	// @Post("session/add")
	// async sessionAdd(@Body() body: SessionAddDto) {
	// 	return await this.sessionsService.add(body);
	// }

	// /**
	//  *
	//  * @returns
	//  */
	// @UseGuards(AuthenticatedGuard)
	// @Post("session/remove")
	// async sessionRemove() {
	// 	return await this.sessionsService.login();
	// }

	// /**
	//  *
	//  * @returns
	//  */
	// @UseGuards(AuthenticatedGuard)
	// @Post("session/remove-all")
	// async sessionRemoveAll() {
	// 	return await this.sessionsService.login();
	// }

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
		const ret = await this.sessionsService.groupAdd(body, user);
		return ret;
	}

	/**
	 * edits the group (can only be a member of that group)
	 * @param title title
	 * @param emoji emoji
	 * @returns updated group
	 */
	@UseGuards(AuthenticatedGuard, GroupMemberGuard)
	@Post("group/edit")
	async groupEdit(@Body() body: GroupEditDto): Promise<GroupEditReturn> {
		const ret = await this.sessionsService.groupEdit(body);
		return { group: ret };
	}

	// /**
	//  *
	//  * @returns
	//  */
	// @UseGuards(AuthenticatedGuard)
	// @Post("group/delete")
	// async groupDelete() {
	// 	return await this.sessionsService.login();
	// }
}
