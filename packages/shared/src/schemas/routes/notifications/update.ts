import { createZodDto } from "nestjs-zod";
import z from "zod";

import { notification_promise_statusSchema } from "../../prisma/schemas/enums/notification_promise_status.schema.js";
import { notificationsType } from "../../prisma/schemas/models/notifications.schema.js";

/**
 * schema
 */
export const notificationsUpdateSchema = z.object({
  id: z.nanoid(),
	userId: z.nanoid(),
	text: z.string(),
	description: z.string().optional(),
	promiseStatus: notification_promise_statusSchema.optional(),
});

/**
 * type
 */
export type NotificationsUpdateSchema = z.infer<typeof notificationsUpdateSchema>;

/**
 * dto
 */
export class NotificationsUpdateDto extends createZodDto(
	notificationsUpdateSchema,
) {}

/**
 * return
 */
export type NotificationsUpdateReturn = notificationsType;
