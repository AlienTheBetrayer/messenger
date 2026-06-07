import {
	notificationsPushSchema,
	notificationsUpdateSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";
import z from "zod";

/**
 * /notifications/push/
 */
export class NotificationsPushDto extends createZodDto(
	notificationsPushSchema,
) {}

/**
 * /notifications/update
 */
export class NotificationsUpdateDto extends createZodDto(
	notificationsUpdateSchema,
) {}
