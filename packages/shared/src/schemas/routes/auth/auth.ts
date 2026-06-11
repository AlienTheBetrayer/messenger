import z from "zod";

import { AuthConfig } from "../../../config/auth";

/**
 * schema
 */
export const authSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(AuthConfig.password.min)
		.max(AuthConfig.password.max),
	code: z.string().length(AuthConfig.code.length),
});

/**
 * type
 */
export type AuthSchema = z.infer<typeof authSchema>;
