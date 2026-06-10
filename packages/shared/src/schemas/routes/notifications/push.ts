import { createZodDto } from "nestjs-zod";
import z from "zod";

import { notification_promise_statusSchema } from "../../prisma/schemas/enums/notification_promise_status.schema.js";
import { notification_typeSchema } from "../../prisma/schemas/enums/notification_type.schema.js";
import { notificationsType } from "../../prisma/schemas/models/notifications.schema.js";

/**
 * schema
 */
export const notificationsPushSchema = z.object({
	id: z.nanoid().optional(),
	userId: z.nanoid(),
	text: z.string(),
	description: z.string().optional(),
	type: notification_typeSchema,
	promiseStatus: notification_promise_statusSchema.optional(),
});

/**
 * type
 */
export type NotificationsPushSchema = z.infer<typeof notificationsPushSchema>;

/**
 * dto
 */
export class NotificationsPushDto extends createZodDto(
	notificationsPushSchema,
) { }

/**
 * return
 */
export type NotificationsPushReturn = notificationsType;
