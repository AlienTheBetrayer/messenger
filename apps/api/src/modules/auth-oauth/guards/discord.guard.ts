import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { getAuthenticateOptions } from "./google.guard";

@Injectable()
export class DiscordGuard extends AuthGuard("discord") {
	async getAuthenticateOptions(context: ExecutionContext) {
		return await getAuthenticateOptions(context);
	}
}
