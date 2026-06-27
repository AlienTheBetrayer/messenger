import z from "zod";

import {
	auth_sessionsSchema,
	auth_sessionsType,
} from "../prisma/schemas/models/auth_sessions.schema.js";
import { connected_sessionsType } from "../prisma/schemas/models/connected_sessions.schema.js";
import { connected_sessions_groupType } from "../prisma/schemas/models/connected_sessions_group.schema.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";

/**
 * connections (get)
 */
export type ConnectionsReturn = {
	connections: (connected_sessions_groupType & {
		connected_sessions: (connected_sessionsType & {
			auth_sessions: auth_sessionsType & { users: usersType };
		})[];
	})[];
};

/**
 * connection/add
 */
export const connectionAddSchema = z.object({
	groupId: z.nanoid(),
	session: auth_sessionsSchema,
});
export type ConnectionAddSchema = z.infer<typeof connectionAddSchema>;
export type ConnectionAddReturn = {
  connected_session: connected_sessionsType;
}

/**
 * connection/delete
 */
export const connectionDeleteSchema = z.object({ connectionId: z.nanoid() });
export type ConnectionDeleteSchema = z.infer<typeof connectionDeleteSchema>;
export type ConnectionDeleteReturn = {
  connected_session: connected_sessionsType;
}
