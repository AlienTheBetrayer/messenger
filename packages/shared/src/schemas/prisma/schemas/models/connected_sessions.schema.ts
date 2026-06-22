import * as z from 'zod';

export const connected_sessionsSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  created_at: z.date(),
  group_id: z.string(),
});

export type connected_sessionsType = z.infer<typeof connected_sessionsSchema>;
