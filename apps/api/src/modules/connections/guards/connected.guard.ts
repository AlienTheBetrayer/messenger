import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { createException } from "../../../common";
import { ConnectionsCoreService } from "../connections-core.service";

@Injectable()
export class ConnectedGuard implements CanActivate {
	constructor(
		private readonly connectionsCoreService: ConnectionsCoreService,
		private readonly reflector: Reflector,
	) {}

	async verify(request: Request) {
		try {
			await this.connectionsCoreService.verifyConnection(request);
		} catch {
			return true;
		}

		throw new Error();
	}

	async canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();

		try {
			return await this.verify(request);
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
