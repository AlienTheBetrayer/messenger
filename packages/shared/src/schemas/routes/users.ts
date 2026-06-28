import z from "zod";

import { AuthConfig } from "../../config/auth.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";

export const userCreateSchema = z.object({
	email: z.email("Please enter a valid email address."),
	username: z.string().optional(),
	password: z
		.string()
		.min(
			AuthConfig.password.min,
			`Password must be at least ${AuthConfig.password.min} characters.`,
		)
		.max(
			AuthConfig.password.max,
			`Password must be at most ${AuthConfig.password.max} characters.`,
		)
		.nullable(),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserCreateReturn = {
	user: usersType;
};
