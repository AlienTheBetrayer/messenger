import * as z from 'zod';

export const usersSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string().nullish(),
  password: z.string(),
  deleted_at: z.date().nullish(),
  edited_at: z.date().nullish(),
  created_at: z.date(),
});

export type usersType = z.infer<typeof usersSchema>;
