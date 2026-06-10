import * as z from 'zod';

export const AuthSessionScalarFieldEnumSchema = z.enum(['id', 'user_id', 'refresh_token_hash', 'last_seen_at', 'created_at', 'browser', 'os', 'device', 'cpu', 'ip'])

export type AuthSessionScalarFieldEnum = z.infer<typeof AuthSessionScalarFieldEnumSchema>;