import z from "zod";

/**
 * access/refresh token payload
 */
export const tokenPayloadSchema = z.object({
	sessionId: z.uuid(),
	userId: z.uuid(),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;

export type LoginNeededRequest = {
	ip: string | undefined;
	cookies: Record<string, string>;
	[key: string]: unknown;
};
