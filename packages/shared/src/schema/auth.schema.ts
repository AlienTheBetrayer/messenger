import z from "zod";
import {
	CODE_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "../config/auth.js";

/**
 * auth schema
 */
export const authSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z
		.string()
		.min(
			PASSWORD_MIN_LENGTH,
			`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
		)
		.max(
			PASSWORD_MAX_LENGTH,
			`Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
		),
});

export type AuthSchema = z.infer<typeof authSchema>;

/**
 * verify schema
 */
export const verifySchema = z.object({
	code: z
		.string()
		.length(CODE_LENGTH, `Code must be ${CODE_LENGTH} characters.`),
});

export type VerifySchema = z.infer<typeof verifySchema>;

/**
 * full auth schema
 */
export const authRequestSchema = authSchema.extend({
	code: verifySchema.shape.code.optional(),
});

export type AuthRequestSchema = z.infer<typeof authRequestSchema>;
