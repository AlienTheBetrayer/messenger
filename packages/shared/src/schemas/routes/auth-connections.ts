import z from "zod";

/**
 * session/add-oauth
 */
export const authSessionOauthInit = z.object({
	service: z.enum(["google", "github"] as const),
});
export type AuthSessionOauthInit = z.infer<typeof authSessionOauthInit>;
