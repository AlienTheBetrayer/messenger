import z from "zod";

import { notification_promise_statusSchema } from "../../prisma/schemas/enums/notification_promise_status.schema";
import { notification_typeSchema } from "../../prisma/schemas/enums/notification_type.schema";
import { notificationsType } from "../../prisma/schemas/models/notifications.schema";

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
 * return
 */
export type NotificationsPushReturn = notificationsType;
