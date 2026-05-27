import { randomInt } from "crypto";

export const randomString = (length: number, characters?: string) => {
	const chars =
		characters ??
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	let str = "";
	for (let i = 0; i < 8; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}

	return Array.from({ length }, () => randomInt(0, chars.length)).join("");
};
