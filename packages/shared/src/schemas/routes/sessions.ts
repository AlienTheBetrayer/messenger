import z from "zod";

import {
  auth_sessionSchema,
  auth_sessionType,
} from "../prisma/schemas/models/auth_session.schema.js";
import { connected_sessionsType } from "../prisma/schemas/models/connected_sessions.schema.js";
import { connected_sessions_groupType } from "../prisma/schemas/models/connected_sessions_group.schema.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";

/**
 * sessions (get)
 */
export type SessionsReturn = {
	sessions: (connected_sessions_groupType & {
		connected_sessions: (connected_sessionsType & {
			auth_sessions: auth_sessionType & { users: usersType };
		})[];
	})[];
};

/**
 * session/add
 */
export const sessionAdd = z.object({
	groupId: z.nanoid(),
	session: auth_sessionSchema,
});
export type SessionAdd = z.infer<typeof sessionAdd>;
