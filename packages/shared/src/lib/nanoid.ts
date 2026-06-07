import { customAlphabet } from "nanoid";

import { GlobalConfig } from "../config/global.js";

/**
 * generates a URL-friendly id using nanoid.
 * @param length how many characters
 * @returns a unique nanoid
 */
export const generateId = (length: number = GlobalConfig.id.length) => {
	return customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", length)();
};
