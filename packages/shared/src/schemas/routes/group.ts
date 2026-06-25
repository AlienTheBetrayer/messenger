import z from "zod";

import { groupFormSchema } from "../forms/group.js";
import { connected_sessionsType } from "../prisma/schemas/models/connected_sessions.schema.js";
import { connected_sessions_groupType } from "../prisma/schemas/models/connected_sessions_group.schema.js";

/**
 * return value
 */
export type GroupCreateReturn = {
	group: connected_sessions_groupType;
	connection: connected_sessionsType;
};

/**
 * dto
 */
export const groupCreateSchema = z.object({
	groupId: z.nanoid().optional(),
	connectionId: z.nanoid().optional(),
	title: groupFormSchema.shape.title,
	emoji: groupFormSchema.shape.emoji,
});

export type GroupCreateSchema = z.infer<typeof groupCreateSchema>;
