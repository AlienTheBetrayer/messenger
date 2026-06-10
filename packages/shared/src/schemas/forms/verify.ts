import z from "zod";

import { AuthConfig } from "../../config/auth.js";

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
