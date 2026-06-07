import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import {
  NotificationsPushDto,
  NotificationsUpdateDto,
} from "./notifications.dto";

@Injectable()
export class NotificationsService {
	constructor(private readonly prismaService: PrismaService) {}

	async push(dto: NotificationsPushDto) {
		return await new Promise((res) => {});
	}

	async update(dto: NotificationsUpdateDto) {
		return await new Promise((res) => {});
	}
}
