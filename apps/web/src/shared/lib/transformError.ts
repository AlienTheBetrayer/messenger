import {
	ApiErrorSchema,
	apiErrorSchema,
	AxiosErrorSchema,
	axiosErrorSchema,
	ExceptionCodeTransformations,
	ReduxErrorSchema,
	reduxErrorSchema,
} from "@gravity/shared";
import z from "zod";

const schemas = new Map<"api" | "axios" | "redux", z.ZodType>([
	["api", apiErrorSchema],
	["axios", axiosErrorSchema],
	["redux", reduxErrorSchema],
]);

/**
 * transforms the api error into frontend-friendly data
 * @param statusCode status code of the api error
 * @returns transformed message
 */
export const transformError = (error: unknown) => {
	// default error
	let message = "Unknown error.";

	// parsing
	for (const [name, schema] of schemas) {
		const parsed = z.safeParse(schema, error);
		let data: ApiErrorSchema | undefined;

		if (!parsed.success) {
			continue;
		}

		switch (name) {
			case "api": {
				data = parsed.data as ApiErrorSchema;
				break;
			}
			case "axios": {
				data = (parsed.data as AxiosErrorSchema).response?.data;
				break;
			}
			case "redux": {
				data = (parsed.data as ReduxErrorSchema).data;
				break;
			}
		}

		if (data) {
			message = data.message || ExceptionCodeTransformations[data.code];
			break;
		}
	}

	return message;
};
