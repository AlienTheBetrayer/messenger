import z from "zod";

import { verification_code_typeSchema } from "../../prisma/schemas/enums/verification_code_type.schema.js";

/**
 * schema
 */
export const codeSchema = z.object({
	email: z.email(),
	type: verification_code_typeSchema,
});

/**
 * type
 */
export type AuthCodeSchema = z.infer<typeof codeSchema>;

/**
 * return values
 */
export type AuthCodeReturn = true;
