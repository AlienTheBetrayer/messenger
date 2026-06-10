import {
	NotificationsPushDto,
	NotificationsPushReturn,
	NotificationsUpdateDto,
	NotificationsUpdateReturn,
} from "@gravity/shared";
import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import { NotificationsGuard } from "./notifications.guard";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@UseGuards(AuthGuard, NotificationsGuard)
	@Post("push")
	async push(
		@Body() dto: NotificationsPushDto,
	): Promise<NotificationsPushReturn> {
		return await this.notificationsService.push(dto);
	}

	@UseGuards(AuthGuard, NotificationsGuard)
	@Patch("update")
	async update(
		@Body() dto: NotificationsUpdateDto,
	): Promise<NotificationsUpdateReturn> {
		return await this.notificationsService.update(dto);
	}
}
