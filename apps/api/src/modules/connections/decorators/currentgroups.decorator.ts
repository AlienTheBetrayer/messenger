import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

import { RequestParser } from "../../../common/lib/classes/parser";
import { AuthenticatedUserType } from "../../auth-core/decorators";

/**
 * gets the current authentication groups you are in (works only if GroupMemberGuard or ConnectionMemberGuard is set)
 */
export const CurrentGroups = createParamDecorator(
	(data, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();

		// parsing
		const parser = new RequestParser(req);

		try {
			const user = parser.user();
			return user.session.groups ?? [];
		} catch {
			return [];
		}
	},
);

export type CurrentGroupsType = NonNullable<
	AuthenticatedUserType["session"]["groups"]
>;
