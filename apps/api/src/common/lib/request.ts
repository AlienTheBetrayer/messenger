import { usersSchema } from "@gravity/shared";
import { Request } from "express";

import { createException } from "./exception";

const getBodyUserTypes = ["user_id", "userId", "userid", "USERID"] as const;

/**
 * tries to find user id in the request body
 * @param request express request object
 * @returns user id or throws
 */
export const getBodyUser = (request: Request) => {
	// vars
	const body = request.body as Record<string, unknown>;

	for (const type of getBodyUserTypes) {
		if (type in body && body[type] && typeof body[type] === "string") {
			return { id: body[type] };
		}
	}

	throw createException(
		"unauthorized",
		"UNAUTHENTICATED",
		"request body does not have userId.",
	);
};

/**
 * parses a custom user in the request user object
 * @param request express request object
 * @returns user id or throws
 */
export const getRequestUser = (request: Request) => {
	if (!request.user) {
		throw createException(
			"unauthorized",
			"UNAUTHENTICATED",
			"request user object is missing.",
		);
	}

	const parsed = usersSchema.safeParse(request.user);

	if (!parsed.success) {
		throw createException(
			"unauthorized",
			"UNAUTHENTICATED",
			"request user object is not valid.",
		);
	}

	return parsed.data;
};

/**
 *
 * @param request epxress request object
 * @returns body user id and authenticated user object. or throws
 */
export const resolveRequestUsers = (request: Request) => {
	return { request: getRequestUser(request), body: getBodyUser(request) };
};
