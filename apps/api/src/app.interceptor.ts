import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { map } from "rxjs";

/**
 * response interceptor (if succeded adds status: true + wraps in data)
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			map((data: unknown) => ({
				status: true,
				data,
			})),
		);
	}
}
