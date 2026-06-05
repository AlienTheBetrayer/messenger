import { ExceptionCodes } from "@gravity/shared";
import { z } from "zod";

/**
 * oauth identity retrieved from services schema
 */
export const oAuthIdentitySchema = z.object({
	provider: z.enum(["google", "github"]),
	providerId: z.string(),
	email: z.email().optional(),
	name: z.string(),
	profileUrl: z.string().optional(),
	error: z.enum(ExceptionCodes).optional(),
});

/**
 * github api
 */
export type GithubUserEmails = {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: "public" | "private";
};
