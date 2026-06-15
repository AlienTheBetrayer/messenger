import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { createException } from "../../../common";
import { AuthCoreService } from "../auth.service";

/**
 * auth guard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private readonly authCoreService: AuthCoreService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();

		try {
			const ret = await this.authCoreService.verify(request);
			return ret;
		} catch (e) {
			// optional redirect
			const redirectURL = this.reflector.get<string | undefined>(
				"authentication-failure-redirect",
				context.getHandler(),
			);

			const message = e instanceof Error ? e.message : null;
			throw createException(
				"unauthorized",
				"UNAUTHENTICATED",
				message ?? "refresh token could not be verified.",
				{
					redirectURL,
				},
			);
		}
	}
}
