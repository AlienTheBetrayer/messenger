import { randomInt } from "crypto";

/**
 * generates a random string
 * @param length length of the random string
 * @param characters (optional) characters to get random string from
 * @returns random string
 */
export const randomString = (length: number, characters?: string) => {
	const chars =
		characters ??
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	return Array.from({ length }, () => randomInt(0, chars.length)).join("");
};
