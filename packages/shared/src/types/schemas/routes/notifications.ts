import z from "zod";

import { notification_promise_statusSchema } from "../../prisma/schemas/enums/notification_promise_status.schema.js";
import { notification_typeSchema } from "../../prisma/schemas/enums/notification_type.schema.js";

/**
 * /notifications/push/
 */
export const notificationsPushSchema = z.object({
  id: z.uuid().optional(),
  userId: z.uuid(),
	text: z.string(),
	type: notification_typeSchema,
	promiseStatus: notification_promise_statusSchema.optional(),
});
export type NotificationsPushSchema = z.infer<typeof notificationsPushSchema>;

/**
 * /notifications/update
 */
export const notificationsUpdateSchema = z.object({
  userId: z.uuid(),
  id: z.uuid(),
	promiseStatus: notification_promise_statusSchema.optional(),
	text: z.string(),
});
export type NotificationsUpdateSchema = z.infer<
	typeof notificationsUpdateSchema
>;
