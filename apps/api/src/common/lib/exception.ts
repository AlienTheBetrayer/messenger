import { type ExceptionCode, HttpStatusCodes } from "@gravity/shared";
import { HttpException } from "@nestjs/common";

/**
 * creates an exception using the exception code
 * @param httpCode http status code
 * @param exceptionCode string code meant to be used for other apps/frontend
 * @returns an exception meant to be thrown
 */
export const createException = (
	httpCode: keyof typeof HttpStatusCodes,
	exceptionCode: ExceptionCode,
	message: string,
	meta?: { redirectURL?: string },
) => {
	// vars
	const statusCode = HttpStatusCodes[httpCode];

	// exception
	const exception = new HttpException(
		{
			statusCode,
			code: exceptionCode,
			message,
			redirectURL: meta?.redirectURL,
		},
		statusCode,
	);

	return exception;
};
