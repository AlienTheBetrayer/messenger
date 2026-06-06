import { AuthConfig } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";
import z from "zod";

/**
 * user schema
 */
export const userSchema = z.object({
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
		)
		.nullable(),
});

/**
 * type + dto
 */
export type UserSchema = z.infer<typeof userSchema>;
export const UserSchemaDto = createZodDto(userSchema);
