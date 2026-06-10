"use server";

import { cookies } from "next/headers";

/**
 * global function that attaches authentication tokens and wraps fetch()
 * @param input url
 * @param init options
 * @returns fetch() returned promise
 */
export const sfetch = async (
	input: string | URL | Request,
	init?: RequestInit,
) => {
	// cookies
	const cookieStore = await cookies();

	// tokens
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	// fetching
	const promise = fetch(input, {
		headers: {
			Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
		},
		...(init ?? {}),
	});

	return promise;
};
