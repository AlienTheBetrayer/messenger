import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

import { createException } from "../../common";
import { resolveRequestUsers } from "../../common/lib/request";

@Injectable()
export class NotificationsGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();
		const users = resolveRequestUsers(request);

		if (users.body.id !== users.request.id) {
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				"user id mismatch.",
			);
		}

		return true;
	}
}
