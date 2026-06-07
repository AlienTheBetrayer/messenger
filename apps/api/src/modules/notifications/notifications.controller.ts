import { Controller, Patch, Post } from "@nestjs/common";

import {
	NotificationsPushDto,
	NotificationsUpdateDto,
} from "./notifications.dto";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post("push")
	async push(dto: NotificationsPushDto) {
		return await this.notificationsService.push(dto);
	}

	@Patch("update")
	async update(dto: NotificationsUpdateDto) {
		return await this.notificationsService.update(dto);
	}
}
