import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext) {
		const request: Request = ctx.switchToHttp().getRequest();
		console.warn(request.url);
		return true;
	}
}
