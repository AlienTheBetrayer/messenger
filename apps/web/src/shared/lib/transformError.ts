import { type ApiError, transformations } from "@gravity/shared";
import axios from "axios";

/**
 * transforms the api error into frontend-friendly data
 * @param statusCode status code of the api error
 * @returns transformed message
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
