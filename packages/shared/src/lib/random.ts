/**
 * generates a random number within a specified range
 * @param min start value of the range
 * @param max end value of the range
 * @returns random number within that range
 */
export const randomRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

	return Array.from({ length }, () => randomRange(0, chars.length - 1)).join(
		"",
	);
};

/**
 * generates a random hex color with # at the beginning
 * @returns hex color
 */
export const randomHex = () => {
	return (
		"#" +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")
	);
};

/**
 * returns a random element in the array
 * @param array array to get an element from
 * @returns a random element
 */
export const randomElement = <T>(array: T[]): T => {
	return array[randomRange(0, array.length - 1)];
};
