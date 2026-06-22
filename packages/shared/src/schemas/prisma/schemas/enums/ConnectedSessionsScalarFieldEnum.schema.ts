import * as z from 'zod';

export const ConnectedSessionsScalarFieldEnumSchema = z.enum(['id', 'session_id', 'created_at', 'group_id'])

export type ConnectedSessionsScalarFieldEnum = z.infer<typeof ConnectedSessionsScalarFieldEnumSchema>;