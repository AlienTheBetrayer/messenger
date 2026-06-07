import * as z from 'zod';

export const NotificationsScalarFieldEnumSchema = z.enum(['id', 'text', 'description', 'type', 'promise_status', 'created_at', 'user_id'])

export type NotificationsScalarFieldEnum = z.infer<typeof NotificationsScalarFieldEnumSchema>;