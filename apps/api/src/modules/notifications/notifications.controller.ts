import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "../auth/auth.guard";
import {
  NotificationsPushDto,
  NotificationsUpdateDto,
} from "./notifications.dto";
import { NotificationsGuard } from "./notifications.guard";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@UseGuards(AuthGuard, NotificationsGuard)
	@Post("push")
	async push(@Body() dto: NotificationsPushDto) {
		return await this.notificationsService.push(dto);
	}

	@UseGuards(AuthGuard, NotificationsGuard)
	@Patch("update")
	async update(@Body() dto: NotificationsUpdateDto) {
		return await this.notificationsService.update(dto);
	}
}
