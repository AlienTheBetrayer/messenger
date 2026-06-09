import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { map } from "rxjs/operators";

import { JwtService } from "../jwt/jwt.service";
import { TokenPayloadSchema } from "./auth.types";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
	constructor(private readonly jwtService: JwtService) {}

	intercept(context: ExecutionContext, next: CallHandler) {
		const request: Request = context.switchToHttp().getRequest();
		const response: Response = context.switchToHttp().getResponse();

		return next.handle().pipe(
			map((data: unknown) => {
				// getting tokens
				const { accessToken, refreshToken } = this.jwtService.getAuthTokens({
					request,
				});

				// refresh token not valid / absent - ignore
				if (!refreshToken) {
					return data;
				}

				let payload: TokenPayloadSchema | null = null;
				try {
					payload = this.jwtService.verify({
						token: refreshToken,
						key: "REFRESH_TOKEN_SECRET",
					});
				} catch {
					return data;
				}

				// access token valid - ignore
				if (accessToken) {
					try {
						this.jwtService.verify({
							token: accessToken,
							key: "ACCESS_TOKEN_SECRET",
						});
					} catch {
						return data;
					}
				}

				// intercepting
				this.jwtService.issueAuthTokens({ payload, request, response });
				return data;
			}),
		);
	}
}
