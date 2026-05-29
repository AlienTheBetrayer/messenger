import { z } from "zod";

/**
 * oauth user retrieved from services schema
 */
export const OAuthUserSchema = z.object({
	provider: z.literal("google"),
	providerId: z.string(),
	email: z.email(),
	name: z.string(),
	profileUrl: z.string().optional(),
});

/**
 * oauth user retrieved from services
 */
export type OAuthUser = z.infer<typeof OAuthUserSchema>;
