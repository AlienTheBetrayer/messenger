import z from "zod";

import { GlobalConfig } from "../../../config/global.js";
import { notification_promise_statusSchema } from "../../prisma/schemas/enums/notification_promise_status.schema.js";
import { notification_typeSchema } from "../../prisma/schemas/enums/notification_type.schema.js";

/**
 * /notifications/push/
 */
export const notificationsPushSchema = z.object({
	id: z.string().length(GlobalConfig.id.length).optional(),
	userId: z.string().length(GlobalConfig.id.length),
	text: z.string(),
	description: z.string().optional(),
	type: notification_typeSchema,
	promiseStatus: notification_promise_statusSchema.optional(),
});
export type NotificationsPushSchema = z.infer<typeof notificationsPushSchema>;

/**
 * /notifications/update
 */
export const notificationsUpdateSchema = z.object({
	userId: z.string().length(GlobalConfig.id.length),
	id: z.string().length(GlobalConfig.id.length),
	text: z.string(),
	description: z.string().optional(),
	promiseStatus: notification_promise_statusSchema.optional(),
});
export type NotificationsUpdateSchema = z.infer<
	typeof notificationsUpdateSchema
>;
