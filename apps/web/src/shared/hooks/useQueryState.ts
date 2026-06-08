"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Options = {
	replace?: boolean;
	shallow?: boolean;
};

const DefaultOptions: Options = {
	replace: true,
	shallow: true,
};

type EnumValue<T extends readonly string[]> = T extends readonly string[]
	? T[number]
	: string;

/**
 * read and modify URL search params with ease
 * @param key url key
 * @param options options object
 * @returns value and setter function
 */
export function useQueryState<E extends readonly string[]>(
	key: string,
	types?: E,
) {
	// nextjs hooks
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	type T = EnumValue<E> | null;

	// value
	const value = searchParams.get(key) as T;

	// setter function
	const setValue = useCallback(
		(newValue: T, options: Options = DefaultOptions) => {
			const params = new URLSearchParams(searchParams.toString());

			if (!newValue) {
				params.delete(key);
			} else {
				params.set(key, newValue);
			}

			const qs = params.toString();
			const url = qs ? `${pathname}?${qs}` : pathname;

			if (options.replace) {
				router.replace(url);
			} else {
				router.push(url);
			}
		},
		[key, pathname, router, searchParams],
	);

	return [value, setValue] as const;
}
