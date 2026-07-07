import z from "zod";

import { AuthConfig } from "../../config/auth.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";

export const userCreateSchema = z.object({
  userId: z.nanoid().optional(),
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

export const userDeleteSchema = z.object({
  userId: z.nanoid(),
});
export type UserDeleteSchema = z.infer<typeof userDeleteSchema>;
export type UserDeleteReturn = {
  user: usersType
};

export const userEditSchema = z.object({
  userId: z.nanoid(),
  status: z.string().optional(),
  emoji: z.string().optional(),
  color: z.hex().optional(),
});
export type UserEditSchema = z.infer<typeof userEditSchema>;
export type UserEditReturn = {
  user: usersType;
}