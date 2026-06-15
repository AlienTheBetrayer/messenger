import { usersSchema, usersType } from "@gravity/shared";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

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
		const parsed = usersSchema.safeParse(user);

		if (!parsed.success) {
			return null;
		}

		return parsed.data;
	},
);

/**
 * type
 */
export type AuthenticatedUserType = usersType;
