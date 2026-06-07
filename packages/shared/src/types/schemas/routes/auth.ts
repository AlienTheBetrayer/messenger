import z from "zod";

import { verification_code_typeSchema } from "../../prisma/schemas/enums/verification_code_type.schema.js";
import { authFormSchema, verificationFormSchema } from "../auth.schema.js";

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
