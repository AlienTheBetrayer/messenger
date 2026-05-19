import { useEffect, useMemo, useState } from "react";

/**
 * debounced state
 * @param initialValue initial value to set
 * @param delayMs how many seconds to wait until setting
 * @returns debounced value and a function to poll the update
 */
export const useDebounce = <T>(initialValue: T, config?: { delayMs?: number; onUpdate?: (debounced: T) => void }) => {
    const [debounced, setDebounced] = useState<T>(initialValue);
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(value);
            config?.onUpdate?.(value);
        }, config?.delayMs ?? 300);

        return () => clearTimeout(timeout);
    }, [value, config]);

    return useMemo(
        () => ({
            debounced,
            value,
            setValue,
        }),
        [debounced, value],
    );
};
