import {
	NotificationsPushReturn,
	NotificationsUpdateReturn,
} from "@gravity/shared";
import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";

import { AuthenticatedGuard } from "../auth-core/guards/authenticated.guard";
import {
	NotificationsPushDto,
	NotificationsUpdateDto,
} from "./notifications.dto";
import { NotificationsGuard } from "./guards/notifications.guard";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@UseGuards(AuthenticatedGuard, NotificationsGuard)
	@Post("push")
	async push(
		@Body() dto: NotificationsPushDto,
	): Promise<NotificationsPushReturn> {
		return await this.notificationsService.push(dto);
	}

	@UseGuards(AuthenticatedGuard, NotificationsGuard)
	@Patch("update")
	async update(
		@Body() dto: NotificationsUpdateDto,
	): Promise<NotificationsUpdateReturn> {
		return await this.notificationsService.update(dto);
	}
}
