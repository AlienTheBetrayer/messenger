import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

import { createException } from "../../../common";
import { ConnectionsCoreService } from "../connections-core.service";

@Injectable()
export class GroupOwnerGuard implements CanActivate {
	constructor(private readonly connectionCoreService: ConnectionsCoreService) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		try {
			return await this.connectionCoreService.verifyGroup(request, "ownership");
		} catch (e) {
			const message = e instanceof Error ? e.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				`${message}; only available for owners.`,
			);
		}
	}
}
