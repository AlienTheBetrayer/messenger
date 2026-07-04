import {
	auth_sessionsSchema,
	connections_groupSchema,
	usersSchema,
} from "@gravity/shared";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

/**
 * schema representation of the authenticated user
 */
export const authenticatedUserSchema = usersSchema.extend({
	session: auth_sessionsSchema.extend({
		groups: connections_groupSchema.array().optional(),
	}),
});

/**
 * type
 */
export type AuthenticatedUserType = z.infer<typeof authenticatedUserSchema>;

/**
 * decorator for getting the authenticated user. (works only if auth guard is set)
 * @returns authenticated user object. null if not parsed. undefined if not found.
 */
export const AuthenticatedUser = createParamDecorator(
	(body, ctx: ExecutionContext) => {
		// request
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req.user;

		// validation
		if (!user) {
			return undefined;
		}

		// parsing
		const parsed = authenticatedUserSchema.safeParse(user);

		if (!parsed.success) {
			return null;
		}

		return parsed.data;
	},
);
