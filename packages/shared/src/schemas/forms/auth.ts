import z from "zod";

import { AuthConfig } from "../../config/auth";

/**
 * auth form
 */
export const authFormSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z
		.string()
		.min(
			AuthConfig.password.min,
			`Password must be at least ${AuthConfig.password.min} characters.`,
		)
		.max(
			AuthConfig.password.max,
			`Password must be at most ${AuthConfig.password.max} characters.`,
		),
});

export type AuthFormSchema = z.infer<typeof authFormSchema>;
