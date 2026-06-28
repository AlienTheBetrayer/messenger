import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { createException } from "../../../common";
import { oAuthIdentitySchema } from "../../auth-oauth/oauth.types";
import { AuthCoreService } from "../auth.service";

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
	constructor(
		private readonly authCoreService: AuthCoreService,
		private readonly reflector: Reflector,
	) {}

	/**
	 * inverted version of the standard verify
	 * @param request request object
	 * @returns true if we're not authenticated, throws if we're authenticated
	 */
	private async verify(request: Request) {
		// throws if not verified
		try {
			await this.authCoreService.verify(request);
		} catch (e) {
			return true;
		}

		throw new Error();
	}

	async canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();
		const parsed = await oAuthIdentitySchema.safeParseAsync(request.user);

		// passing if connection mode
		if (parsed.success && parsed.data.metadata.action === "connect") {
			return true;
		}

		try {
			return await this.verify(request);
		} catch (e) {
			// optional redirect
			const redirectURL = this.reflector.get<string | undefined>(
				"authentication-failure-redirect",
				context.getHandler(),
			);

			const message = e instanceof Error ? e.message : null;
			throw createException(
				"forbidden",
				"AUTHENTICATED",
				message ??
					"already authenticated, this route is only available for unauthenticated users.",
				{
					redirectURL,
				},
			);
		}
	}
}
