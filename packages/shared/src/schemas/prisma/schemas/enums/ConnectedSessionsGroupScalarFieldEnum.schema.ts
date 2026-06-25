import * as z from 'zod';

export const ConnectedSessionsGroupScalarFieldEnumSchema = z.enum(['id', 'title', 'emoji', 'edited_at', 'created_at', 'owner_user_id'])

export type ConnectedSessionsGroupScalarFieldEnum = z.infer<typeof ConnectedSessionsGroupScalarFieldEnumSchema>;