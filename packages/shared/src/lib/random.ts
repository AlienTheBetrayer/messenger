import { randomInt } from "crypto";

export const randomString = (length: number, characters?: string) => {
	const chars =
		characters ??
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	return Array.from({ length }, () => randomInt(0, chars.length)).join("");
};
