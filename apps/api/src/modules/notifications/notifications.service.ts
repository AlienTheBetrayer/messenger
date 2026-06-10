import {
	generateId,
	NotificationsPushSchema,
	NotificationsUpdateSchema,
} from "@gravity/shared";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationsService {
	constructor(private readonly prismaService: PrismaService) {}

	push = async (dto: NotificationsPushSchema) => {
		return await this.prismaService.notifications.create({
			data: {
				id: dto.id ?? generateId(),
				text: dto.text,
				user_id: dto.userId,
				type: dto.type,
				promise_status: dto.promiseStatus,
				description: dto.description,
			},
		});
	};

	async update(dto: NotificationsUpdateSchema) {
		return await this.prismaService.notifications.update({
			where: {
				id: dto.id,
				user_id: dto.userId,
			},
			data: {
				text: dto.text,
				promise_status: dto.promiseStatus,
				description: dto.description,
			},
		});
	}
}
