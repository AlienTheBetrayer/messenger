import z from "zod";

/**
 * auth schema
 */
export const authSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters.")
		.max(32, "Password must be at most 32 characters."),
});

export type AuthSchema = z.infer<typeof authSchema>;

/**
 * verify schema
 */
export const verifySchema = z.object({
	code: z.string().length(6, "Please enter a valid code."),
});

export type VerifySchema = z.infer<typeof verifySchema>;
