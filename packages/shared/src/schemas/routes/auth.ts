import z from "zod";

import { AuthConfig } from "../../config/auth.js";
import { verification_code_typeSchema } from "../prisma/schemas/enums/verification_code_type.schema.js";
import { auth_sessionsType } from "../prisma/schemas/models/auth_sessions.schema.js";
import { usersType } from "../prisma/schemas/models/users.schema.js";

/**
 * shared auth
 */
export const authSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(AuthConfig.password.min)
		.max(AuthConfig.password.max),
	code: z.string().length(AuthConfig.code.length),
	action: z.enum(["login", "connect"]).optional(),
	actionMetadata: z
		.object({
			groupId: z.nanoid(),
			connectionId: z.nanoid(),
		})
		.optional(),
});

export type AuthSchema = z.infer<typeof authSchema>;

/**
 * shared code
 */
export const codeSchema = z.object({
	email: z.email(),
	type: verification_code_typeSchema,
	action: z.enum(["login", "connect"]).optional(),
});

export type AuthCodeSchema = z.infer<typeof codeSchema>;
export type AuthCodeReturn = true;

/**
 * forgot password
 */
export type AuthForgotPasswordReturn = {
	user: usersType;
};

/**
 * login
 */
export type AuthLoginReturn = {
	accessToken: string;
	refreshToken: string;
	session: auth_sessionsType;
	user: usersType;
};

/**
 * logout
 */
export type AuthLogoutSchema = void;
export type AuthLogoutReturn = {
	session: auth_sessionsType | null;
};

/**
 * me
 */
export type AuthMeSchema = void;
export type AuthMeReturn = {
	user: usersType;
	session: auth_sessionsType;
};

/**
 * signup
 */
export type AuthSignupReturn = {
	user: usersType;
};
