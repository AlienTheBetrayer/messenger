import {
	notificationsPushSchema,
	notificationsUpdateSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * dto
 */
export class NotificationsPushDto extends createZodDto(
	notificationsPushSchema,
) {}

export class NotificationsUpdateDto extends createZodDto(
	notificationsUpdateSchema,
) {}
