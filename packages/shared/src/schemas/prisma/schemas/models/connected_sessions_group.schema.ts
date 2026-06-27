import * as z from 'zod';

export const connected_sessions_groupSchema = z.object({
  id: z.string(),
  title: z.string(),
  emoji: z.string().nullish(),
  edited_at: z.date().nullish(),
  created_at: z.date(),
  owner_user_id: z.string(),
  last_connected_at: z.date().nullish(),
});

export type connected_sessions_groupType = z.infer<typeof connected_sessions_groupSchema>;
