/**
 * http status codes (array)
 */
export const HttpStatusCodes = {
	badrequest: 400,
	unauthorized: 401,
	forbidden: 403,
	notfound: 404,
	conflict: 409,
} as const;

/**
 * http status codes (union type)
 */
export type HttpStatusCode =
	(typeof HttpStatusCodes)[keyof typeof HttpStatusCodes];

/**
 * exception codes (array)
 */
export const ExceptionCodes = [
	'USER_ALREADY_EXISTS',
	'USER_NOT_FOUND',
  'INVALID_CREDENTIALS',
  'INVALID_VERIFICATION_CODE'
] as const;

/**
 * exception codes (union type)
 */
export type ExceptionCode = (typeof ExceptionCodes)[number];
