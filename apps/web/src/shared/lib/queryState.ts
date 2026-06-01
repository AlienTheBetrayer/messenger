"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * reactively reads and changes url's state
 * @param key url key
 * @returns url's state and changer function
 */
export function useQueryState(key: string) {
	// states
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// derived states
	const value = searchParams.get(key);

	// functions
	const setValue = useCallback((newValue: string | null) => {
		const params = new URLSearchParams(searchParams.toString());

		if (!newValue) {
			params.delete(key);
		} else {
			params.set(key, newValue);
		}

		const query = params.toString();
		router.replace(query ? `${pathname}?${query}` : pathname);
	}, [router, pathname, searchParams, key]);

	return [value, setValue] as const;
}
