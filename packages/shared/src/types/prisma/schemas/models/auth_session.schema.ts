import * as z from 'zod';

export const auth_sessionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  refresh_token_hash: z.string(),
  user_agent: z.string().nullish(),
  ip_address: z.string().nullish(),
  last_seen_at: z.date().nullish(),
  created_at: z.date(),
});

export type auth_sessionType = z.infer<typeof auth_sessionSchema>;
