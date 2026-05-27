import { HttpStatusCodes, type ExceptionCode } from "@gravity/shared";
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
	message?: string,
) => {
	// vars
	const statusCode = HttpStatusCodes[httpCode];

	// exception
	const exception = new HttpException(
		{ statusCode, code: exceptionCode, ...(message && { message }) },
		statusCode,
	);

	return exception;
};
