import * as z from 'zod';

export const notification_promise_statusSchema = z.enum(['pending', 'resolved', 'rejected'])

export type notification_promise_status = z.infer<typeof notification_promise_statusSchema>;