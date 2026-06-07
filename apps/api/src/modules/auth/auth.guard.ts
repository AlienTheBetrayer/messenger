import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

import { createException } from "../../common";
import { JwtService } from "../jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext) {
		// request
		const request: Request = context.switchToHttp().getRequest();

		if (!("accessToken" in request.cookies)) {
			throw createException("unauthorized", "UNAUTHENTICATED");
		}

		// verifying
		const decoded = this.jwtService.verify({
			token: request.cookies["accessToken"] as string,
			key: "ACCESS_TOKEN_SECRET",
		});

		// setting user
		request.user = decoded.userId;

		return true;
	}
}
