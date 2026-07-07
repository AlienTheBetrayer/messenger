import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import z from "zod";

import { createException } from "../../../common";
import { RequestParser } from "../../../common/lib/classes/parser";

/**
 * passes if userId is the authenticated user (so only able to change your own user data)
 */
@Injectable()
export class UserGuard implements CanActivate {
	canActivate(execution: ExecutionContext) {
		const request: Request = execution.switchToHttp().getRequest();

    // parsing
    const parser = new RequestParser(request);
    const user = parser.user();
    const body = parser.body({ userId: z.nanoid() }); 

    // validating
		if (user.id !== body.userId) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"you are not authorized to perform this action.",
			);
		}

		return true;
	}
}
