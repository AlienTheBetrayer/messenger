import z from "zod";

/**
 * schema + type for user set auth guard
 */
export const authGuardUserSchema = z.object({
	id: z.string(),
});
export type AuthGuardUserType = z.infer<typeof authGuardUserSchema>;

/**
 * access/refresh token payload
 */
export const tokenPayloadSchema = z.object({
	sessionId: z.nanoid(),
	userId: z.nanoid(),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;
