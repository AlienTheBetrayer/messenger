import * as z from 'zod';

export const AuthSessionScalarFieldEnumSchema = z.enum(['id', 'user_id', 'refresh_token_hash', 'user_agent', 'ip_address', 'last_seen_at', 'created_at'])

export type AuthSessionScalarFieldEnum = z.infer<typeof AuthSessionScalarFieldEnumSchema>;