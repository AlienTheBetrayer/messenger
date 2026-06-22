import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";

import {
	AuthenticatedUser,
	AuthenticatedUserType,
} from "../auth-core/decorators";
import { AuthenticatedGuard } from "../auth-core/guards";
import { AuthSessionOauthInitDto } from "./auth.dto";
import { AuthConnectionsService } from "./auth.service";

@Controller("auth-connections")
export class AuthConnectionsController {
	constructor(private readonly authConnectionService: AuthConnectionsService) {}

	/**
	 * gets all the currently connected auth sessions in groups
	 * @returns sessions categorized by its connection (id + title + emoji)
	 */
	@UseGuards(AuthenticatedGuard)
	@Get()
	async sessions(@AuthenticatedUser() user: AuthenticatedUserType) {
		const sessions = await this.authConnectionService.sessions(user.session.id);
		return { sessions };
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("session/add")
	async sessionAdd() {
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("session/oauth-init")
  async sessionOauthAdd(@Query() query: AuthSessionOauthInitDto) {
    console.log(query.service);
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("session/remove")
	async sessionRemove() {
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("session/remove-all")
	async sessionRemoveAll() {
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("group/add")
	async groupAdd() {
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("group/edit")
	async groupEdit() {
		return await this.authConnectionService.login();
	}

	/**
	 *
	 * @returns
	 */
	@UseGuards(AuthenticatedGuard)
	@Post("group/delete")
	async groupDelete() {
		return await this.authConnectionService.login();
	}
}
