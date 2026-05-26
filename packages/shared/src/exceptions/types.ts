import type { ExceptionCode, HttpStatusCode } from './codes.js';

/**
 * api error response type
 */
export type ApiError = {
	statusCode: HttpStatusCode;
	code: ExceptionCode;
	message?: string;
};
