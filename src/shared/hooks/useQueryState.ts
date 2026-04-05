"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * dynamically changes search param in a react-friendly way
 * @param name string name of the search param
 * @returns url value of this name + a function that changes the URL
 */
export const useQueryState = (name: string) => {
    // hooks + states
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const value = searchParams.get(name) || "";

    /**
     * changes the actual url
     * @param value - new value to replace in the URL
     */
    const setValue = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [name, pathname, router, searchParams],
    );

    // returning
    return [value, setValue] as const;
};
