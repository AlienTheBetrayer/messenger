"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * types
 */
type Options = {
	replace?: boolean;
};

type EnumValue<T extends readonly string[]> = T extends readonly string[]
	? T[number]
	: string;

/**
 * metadata
 */
const DefaultOptions: Options = {
	replace: true,
};

let pendingUpdates: Record<string, string | null> | null = null;
let batchTimeout: Promise<void> | null = null;

/**
 * read and modify URL search params with ease. (concurrency handled)
 * @param key url key
 * @param options options object
 * @returns value and setter function

 */
export function useQueryState<E extends readonly string[]>(
	key: string,
	types?: E,
) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	type T = EnumValue<E> | null;
	const value = searchParams.get(key) as T;

	const setValue = useCallback(
		(newValue: T, options: Options = DefaultOptions) => {
			if (!pendingUpdates) {
				pendingUpdates = {};

				const currentSearch =
					typeof window !== "undefined"
						? window.location.search
						: searchParams.toString();
				const initialParams = new URLSearchParams(currentSearch);
				initialParams.forEach((val, k) => {
					if (pendingUpdates) {
						pendingUpdates[k] = val;
					}
				});
			}

			pendingUpdates[key] = newValue;

			if (!batchTimeout) {
				batchTimeout = Promise.resolve().then(() => {
					if (!pendingUpdates) return;

					const finalParams = new URLSearchParams();
					Object.entries(pendingUpdates).forEach(([k, v]) => {
						if (v !== null && v !== undefined && v !== "") {
							finalParams.set(k, v);
						}
					});

          const qs = finalParams.toString();
          const hash = window.location.hash;

          const url = `${pathname}${qs ? `?${qs}` : ""}${hash}`;

					if (options.replace) {
						router.replace(url);
					} else {
						router.push(url);
					}

					pendingUpdates = null;
					batchTimeout = null;
				});
			}
		},
		[key, pathname, router, searchParams],
	);

	return [value, setValue] as const;
}
