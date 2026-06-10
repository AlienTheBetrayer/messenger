import * as z from 'zod';

export const notification_typeSchema = z.enum(['success', 'error', 'warning', 'info', 'promise'])

export type notification_type = z.infer<typeof notification_typeSchema>;