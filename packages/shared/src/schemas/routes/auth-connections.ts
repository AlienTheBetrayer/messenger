import z from "zod";

import { auth_sessionSchema } from "../prisma/schemas/models/auth_session.schema.js";

/**
 * session/add-oauth
 */
export const authSessionAdd = z.object({
  groupId: z.nanoid(),
	session: auth_sessionSchema
});
export type AuthSessionAdd = z.infer<typeof authSessionAdd>;