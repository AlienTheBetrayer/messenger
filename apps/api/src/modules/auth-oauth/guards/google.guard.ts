import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

/**
 * shared getAuthenticateOptions to pass additional data through state
 * @param context execution context
 * @returns state object
 */
export const getAuthenticateOptions = async (context: ExecutionContext) => {
	const req: Request = context.switchToHttp().getRequest();

	return {
		state: JSON.stringify({
			action: req.query.action ?? "login",
			groupId: req.query.groupId || undefined,
		}),
	};
};

@Injectable()
export class GoogleGuard extends AuthGuard("google") {
	async getAuthenticateOptions(context: ExecutionContext) {
		return await getAuthenticateOptions(context);
	}
}
