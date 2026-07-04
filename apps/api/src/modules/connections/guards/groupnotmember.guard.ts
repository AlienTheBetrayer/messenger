import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

import { createException } from "../../../common";
import { ConnectionsCoreService } from "../connections-core.service";

@Injectable()
export class GroupNotMemberGuard implements CanActivate {
	constructor(private readonly connectionCoreService: ConnectionsCoreService) {}

	/**
	 * inverted version of verify membership.
	 * @param request request object
	 * @returns true if not member, throws if member
	 */
	private async verify(request: Request) {
		// throws if not verified
		try {
			await this.connectionCoreService.verifyGroup(request, "membership");
		} catch (e) {
			return true;
		}

		throw new Error();
	}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		try {
			return await this.verify(request);
		} catch (e) {
			const message = e instanceof Error ? e.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				`${message}; only available for not members.`,
			);
		}
	}
}
