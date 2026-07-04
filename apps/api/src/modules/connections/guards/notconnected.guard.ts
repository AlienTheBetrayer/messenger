import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { createException } from "../../../common";
import { ConnectionsCoreService } from "../connections-core.service";

@Injectable()
export class NotConnectedGuard implements CanActivate {
	constructor(
		private readonly connectionsCoreService: ConnectionsCoreService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		try {
			return await this.connectionsCoreService.verifyOAuthConnection(request);
		} catch (e) {
			// optional redirect
			const redirectURL = this.reflector.get<string | undefined>(
				"connection-failure-redirect",
				context.getHandler(),
			);

      const message = e instanceof Error ? e.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				message ?? "user is not connected.",
				{
					redirectURL,
				},
			);
		}
	}
}
