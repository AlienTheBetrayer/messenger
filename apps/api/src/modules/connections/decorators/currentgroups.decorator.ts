import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import {
	authenticatedUserSchema,
	AuthenticatedUserType,
} from "../../auth-core/decorators";

/**
 * gets the current authentication groups you are in (works only if GroupMemberGuard or ConnectionMemberGuard is set)
 */
export const CurrentGroups = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();

		// parsing
		const parsed = z.safeParse(authenticatedUserSchema, req.user);

		if (!parsed.success) {
			return [];
		}

		return parsed.data.session.groups ?? [];
	},
);

export type CurrentGroupsType = NonNullable<
	AuthenticatedUserType["session"]["groups"]
>;
