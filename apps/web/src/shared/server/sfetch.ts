"use server";

import { cookies } from "next/headers";

/**
 * global function that attaches authentication tokens and wraps fetch()
 * @param input relative url (do not include the initial url)
 * @param init options
 * @returns fetch() returned promise
 */
export const sfetch = async (input: string, init?: RequestInit) => {
	// cookies
	const cookieStore = await cookies();

	// tokens
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	// url format
	const isProduction = process.env.NODE_ENV === "production";
	const backendUrl = isProduction
		? "https://api.outwave.com"
		: "http://localhost:3001";
	const slash = input.startsWith("/") ? "" : "/";
	const url = `${backendUrl}${slash}${input}`;

	// fetching
	try {
		const promise = await fetch(url, {
			headers: {
				Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
			},
			...(init ?? {}),
		});

		return promise;
	} catch (e) {
		return e;
	}
};
