import z from "zod";

import { notification_promise_statusSchema } from "../prisma/schemas/enums/notification_promise_status.schema.js";
import { notification_typeSchema } from "../prisma/schemas/enums/notification_type.schema.js";
import { notificationsType } from "../prisma/schemas/models/notifications.schema.js";

/**
 * push
 */
export const notificationsPushSchema = z.object({
	id: z.nanoid().optional(),
	userId: z.nanoid(),
	text: z.string(),
	description: z.string().optional(),
	type: notification_typeSchema,
	promiseStatus: notification_promise_statusSchema.optional(),
});

export type NotificationsPushSchema = z.infer<typeof notificationsPushSchema>;
export type NotificationsPushReturn = notificationsType;

/**
 * update
 */
export const notificationsUpdateSchema = z.object({
	id: z.nanoid(),
	userId: z.nanoid(),
	text: z.string(),
	description: z.string().optional(),
	promiseStatus: notification_promise_statusSchema.optional(),
});

export type NotificationsUpdateSchema = z.infer<
	typeof notificationsUpdateSchema
>;
export type NotificationsUpdateReturn = notificationsType;
