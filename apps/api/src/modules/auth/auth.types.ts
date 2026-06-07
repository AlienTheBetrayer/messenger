import { GlobalConfig } from "@gravity/shared";
import z from "zod";

/**
 * access/refresh token payload
 */
export const tokenPayloadSchema = z.object({
	sessionId: z.string().length(GlobalConfig.id.length),
	userId: z.string().length(GlobalConfig.id.length),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;
