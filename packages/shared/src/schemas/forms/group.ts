import z from "zod";

/**
 * schema
 */
export const groupFormSchema = z.object({
	title: z.string(),
	emoji: z.emoji().optional(),
});

/**
 * type
 */
export type GroupFormSchema = z.infer<typeof groupFormSchema>;
