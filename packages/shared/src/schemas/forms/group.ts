import z from "zod";

import { GroupConfig } from "../../config/group.js";

/**
 * schema
 */
export const groupFormSchema = z.object({
	title: z
		.string()
		.min(
			GroupConfig.title.min,
			`Title must be at least ${GroupConfig.title.min} characters.`,
		)
		.max(
			GroupConfig.title.max,
			`Title must be at most ${GroupConfig.title.max} characters.`,
		),
	emoji: z.emoji().optional(),
});

/**
 * type
 */
export type GroupFormSchema = z.infer<typeof groupFormSchema>;
