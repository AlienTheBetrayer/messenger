import z from "zod";

import { connectionVerifyFormSchema } from "../forms/connection.js";
import { connectionsType } from "../prisma/schemas/models/connections.schema.js";
import { connections_groupType } from "../prisma/schemas/models/connections_group.schema.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";
import { AuthLoginReturn, authSchema } from "./auth.js";

/**
 * connections (get)
 */
export type ConnectionsReturn = {
	groups: (connections_groupType & {
		connections: (connectionsType & {
			users: usersType;
		})[];
	})[];
};

/**
 * connection/add
 */
export const connectionAddSchema = authSchema.extend({
	groupId: z.nanoid(),
	connectionId: z.nanoid().optional(),
});
export type ConnectionAddSchema = z.infer<typeof connectionAddSchema>;
export type ConnectionAddReturn = {
	connection: connectionsType;
	user: usersType;
};

/**
 * connection/create
 */
export const connectionCreateSchema = z.object({
	groupId: z.nanoid(),
	connectionId: z.nanoid().optional(),
	userId: z.nanoid(),
});
export type ConnectionCreateSchema = z.infer<typeof connectionCreateSchema>;
export type ConnectionCreateReturn = {
	connection: connectionsType;
};

/**
 * connection/delete
 */
export const connectionDeleteSchema = z.object({ connectionId: z.nanoid() });
export type ConnectionDeleteSchema = z.infer<typeof connectionDeleteSchema>;
export type ConnectionDeleteReturn = {
	connection: connectionsType;
};

/**
 * connection/init
 */
export const connectionInitSchema = z.object({
	service: z.enum(["github", "google", "discord", "telegram"]),
	groupId: z.nanoid(),
});
export type ConnectionInitSchema = z.infer<typeof connectionInitSchema>;
export type ConnectionInitReturn = void;

/**
 * connection/login
 */
export const connectionLoginSchema = z.object({
	connectionId: z.nanoid(),
	code: connectionVerifyFormSchema.shape.code.optional(),
});
export type ConnectionLoginSchema = z.infer<typeof connectionLoginSchema>;
export type ConnectionLoginReturn = AuthLoginReturn & {
	connection: connectionsType;
};

/**
 * connection/code
 */
export const connectionCodeSchema = z.object({
	connectionId: z.nanoid(),
});
export type ConnectionCodeSchema = z.infer<typeof connectionCodeSchema>;
export type ConnectionCodeReturn = boolean;
