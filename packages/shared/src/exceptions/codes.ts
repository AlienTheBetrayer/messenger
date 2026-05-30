import { ApiErrorSchema } from "../schema/error.schema.js";

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
	"USER_ALREADY_EXISTS",
	"USER_NOT_FOUND",
	"INVALID_CREDENTIALS",
	"INVALID_VERIFICATION_CODE",
	"UNAUTHENTICATED",
	"EMAIL_NOT_FOUND",
	"INVALID_BODY",
] as const;

/**
 * all available transformations
 */
export const ExceptionCodeTransformations = {
	USER_ALREADY_EXISTS: "User already exists.",
	USER_NOT_FOUND: "User not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_VERIFICATION_CODE: "Invalid verification code.",
	UNAUTHENTICATED: "Unauthenticated.",
	EMAIL_NOT_FOUND: "Email not found.",
	INVALID_BODY: "Invalid body.",
} as const satisfies Record<ApiErrorSchema["code"], string>;

/**
 * exception codes (union type)
 */
export type ExceptionCode = (typeof ExceptionCodes)[number];
