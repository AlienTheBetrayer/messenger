import z from "zod";

import { groupFormSchema } from "../forms/group.js";
import { connected_sessionsType } from "../prisma/schemas/models/connected_sessions.schema.js";
import { connected_sessions_groupType } from "../prisma/schemas/models/connected_sessions_group.schema.js";

/**
 * create
 */
export type GroupCreateReturn = {
	group: connected_sessions_groupType;
	connection: connected_sessionsType;
};

export const groupCreateSchema = z.object({
	groupId: z.nanoid().optional(),
	connectionId: z.nanoid().optional(),
	title: groupFormSchema.shape.title,
	emoji: groupFormSchema.shape.emoji,
});

export type GroupCreateSchema = z.infer<typeof groupCreateSchema>;

/**
 * edit
 */
export type GroupEditReturn = {
	group: connected_sessions_groupType;
};

export const groupEditSchema = z.object({
	groupId: z.nanoid(),
	title: groupFormSchema.shape.title.optional(),
	emoji: groupFormSchema.shape.emoji.optional(),
});

export type GroupEditSchema = z.infer<typeof groupEditSchema>;

/**
 * delete
 */
export type GroupDeleteReturn = {
	group: connected_sessions_groupType;
};

export const groupDeleteSchema = z.object({
	groupId: z.nanoid(),
});

export type GroupDeleteSchema = z.infer<typeof groupDeleteSchema>;
