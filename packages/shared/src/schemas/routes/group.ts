import z from "zod";

import { groupFormSchema } from "../forms/group.js";
import { connectionsType } from "../prisma/schemas/models/connections.schema.js";
import { connections_groupType } from "../prisma/schemas/models/connections_group.schema.js";

/**
 * create
 */
export type GroupCreateReturn = {
	group: connections_groupType;
	connection: connectionsType;
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
	group: connections_groupType;
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
	group: connections_groupType;
};

export const groupDeleteSchema = z.object({
	groupId: z.nanoid(),
});

export type GroupDeleteSchema = z.infer<typeof groupDeleteSchema>;
