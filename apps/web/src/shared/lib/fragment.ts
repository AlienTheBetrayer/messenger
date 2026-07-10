import { redirect } from "next/navigation";

import { hashSchema } from "@/shared/lib/hashSchema";

/**
 * types
 */
export type HashSchema = typeof hashSchema;
export type HashRoute = HashSchema[number];

export type SetHashValue =
	| HashRoute
	| null
	| ((current: string) => HashRoute | null);

/**
 * class
 */
export class Fragment {
	constructor(
		private readonly setHash: (value: SetHashValue) => void,
		private readonly getHash: () => string,
	) {}

	/**
	 * updating functions
	 */

	/**
	 * sets the hash
	 * @param segments segments
	 * @param options options
	 */
	set(newHash: HashRoute) {
		this.setHash(newHash);
	}

	/**
	 * toggles the hash (sets it it starts with that, removes it if set)
	 * @param segments segments
	 * @param options options
	 */
	toggle(newHash: HashRoute) {
		this.setHash((hash) => (hash.startsWith(newHash) ? null : newHash));
	}

	/**
	 * deletes the hash
	 */
	delete() {
		this.setHash(null);
	}

	/**
	 * deletes the hash if it matches the provided one
	 * @param hash hash to be matched
	 */
	remove(hash: HashRoute) {
		if (this.getHash() === hash) {
			this.delete();
		}
	}

	/**
	 * deletes the hash if it matches any of the provided ones
	 * @param hashes hashes to be matched
	 */
	removeAny(...hashes: HashRoute[]) {
		if (hashes.includes(this.getHash() as HashRoute)) {
			this.delete();
		}
	}

	/**
	 * getting
	 */

	/**
	 * checks whether hash matches provided segments
	 * @param key segments
	 * @returns boolean
	 */
	is(newHash: HashRoute) {
		return this.getHash() === newHash;
	}

	/**
	 * checks whether hash matches any of the provided segments
	 * @param hashes multiple hashes
	 * @returns boolean
	 */
	isAny(...hashes: HashRoute[]) {
		return hashes.some((hash) => this.is(hash));
	}

	/**
	 * checks whether hash starts with provided segments
	 * @param key segments
	 * @returns boolean
	 */
	startsWith(hash: HashRoute) {
		return this.getHash().startsWith(hash);
	}

	/**
	 * checks whether hash ends with provided segments
	 * @param key segments
	 * @returns boolean
	 */
	endsWith(hash: HashRoute) {
		return this.getHash().endsWith(hash);
	}

	/**
	 * gets raw hash value
	 * @returns hash value (string)
	 */
	get() {
		return this.getHash();
	}

	/**
	 * formats and gets the hash fragments
	 * @returns hash fragments
	 */
	getSegments() {
		return this.getHash()?.split("/");
	}

	/**
	 * miscellaneous
	 */

	/**
	 * redirects to a hash fragment
	 * @param url base url
	 * @param hash  hash fragment
	 */
	static redirect(url: string, hash: HashRoute) {
		redirect(`${url}#${hash}`);
	}
}
