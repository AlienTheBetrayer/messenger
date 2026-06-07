import { Body, Controller, Patch, Post } from "@nestjs/common";

import {
	NotificationsPushDto,
	NotificationsUpdateDto,
} from "./notifications.dto";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post("push")
	async push(@Body() dto: NotificationsPushDto) {
		return await this.notificationsService.push(dto);
	}

	@Patch("update")
	async update(@Body() dto: NotificationsUpdateDto) {
		return await this.notificationsService.update(dto);
	}
}
