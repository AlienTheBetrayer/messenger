import z from "zod";

import { AuthConfig } from "../../config/auth.js";
import { verification_code_typeSchema } from "../prisma/schemas/enums/verification_code_type.schema.js";

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

/**
 * verification form
 */
export const verificationFormSchema = z.object({
	code: z
		.string()
		.length(
			AuthConfig.code.length,
			`Code must be ${AuthConfig.code.length} characters.`,
		),
});

export type VerificationFormSchema = z.infer<typeof verificationFormSchema>;

/**
 * /auth/login /, /auth/signup /, /auth/forgot-password /
 */
export const authSchema = authFormSchema.extend(verificationFormSchema.shape);
export type AuthSchema = z.infer<typeof authSchema>;

/**
 * /auth/code
 */
export const codeSchema = z.object({
	email: z.email(),
	type: verification_code_typeSchema,
});
export type CodeSchema = z.infer<typeof codeSchema>;
