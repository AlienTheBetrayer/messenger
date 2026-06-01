import z from "zod";

import {
	CODE_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
} from "../../config/auth.js";
import { verification_code_typeSchema } from "../prisma/schemas/enums/verification_code_type.schema.js";

/**
 * auth form
 */
export const authFormSchema = z.object({
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

export type AuthFormSchema = z.infer<typeof authFormSchema>;

/**
 * verification form
 */
export const verificationFormSchema = z.object({
	code: z
		.string()
		.length(CODE_LENGTH, `Code must be ${CODE_LENGTH} characters.`),
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
