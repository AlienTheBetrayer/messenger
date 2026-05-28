import axios from "axios";

import type { ApiError } from "@gravity/shared";

/**
 * all available transformations
 */
const transformations = {
	USER_ALREADY_EXISTS: "User already exists.",
	USER_NOT_FOUND: "User not found.",
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_VERIFICATION_CODE: "Invalid verification code.",
} as const satisfies Record<ApiError["code"], string>;

/**
 * transforms the api error into frontend-friendly data
 * @param statusCode status code of the api error
 */
export const transformError = (error: unknown) => {
	// default error
	let message = "Unknown error.";

	// transforming
	if (axios.isAxiosError<ApiError>(error)) {
		const apiError = error.response?.data;

		if (apiError?.code && apiError.code in transformations) {
			message = transformations[apiError.code];
		} else if (apiError?.message) {
			message = apiError.message;
		}
	}

	return message;
};
