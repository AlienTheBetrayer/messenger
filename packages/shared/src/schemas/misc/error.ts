import z from "zod";

import { ExceptionCodes, HttpStatusCodes } from "../../lib/exceptions.js";

/**
 * shared api retrieved error object
 */
export const apiErrorSchema = z.object({
	statusCode: z.enum(HttpStatusCodes),
	code: z.enum(ExceptionCodes),
	message: z.string().optional(),
});

/**
 * axios error schema
 */
export const axiosErrorSchema = z.object({
	response: z
		.object({
			data: apiErrorSchema,
		})
		.optional(),
});

/**
 * redux error schema
 */
export const reduxErrorSchema = z.object({
	data: apiErrorSchema,
});

/**
 * derived types
 */
export type ApiErrorSchema = z.infer<typeof apiErrorSchema>;
export type AxiosErrorSchema = z.infer<typeof axiosErrorSchema>;
export type ReduxErrorSchema = z.infer<typeof reduxErrorSchema>;
