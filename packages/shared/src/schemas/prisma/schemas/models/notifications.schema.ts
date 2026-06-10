import * as z from 'zod';
import { notification_promise_statusSchema } from '../enums/notification_promise_status.schema.js';
import { notification_typeSchema } from '../enums/notification_type.schema.js';

export const notificationsSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string().nullish(),
  type: notification_typeSchema,
  promise_status: notification_promise_statusSchema.nullish(),
  created_at: z.date(),
  user_id: z.string(),
});

export type notificationsType = z.infer<typeof notificationsSchema>;
