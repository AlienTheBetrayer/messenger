import { useEffect, useMemo, useRef, useState } from "react";

export const useImageSelect = () => {
    // internal states & refs
    const [selected, setSelected] = useState<File | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // error timeout
    useEffect(() => {
        if (!error) {
            return;
        }

        const t = setTimeout(() => setError(false), 5000);
        return () => clearTimeout(t);
    }, [error]);

    // cancellation fix for modals
    useEffect(() => {
        const ref = inputRef.current;
        if (!ref) {
            return;
        }

        const handle = (e: Event) => {
            e.stopPropagation();
        };
        ref.addEventListener("cancel", handle);
        return () => ref.removeEventListener("cancel", handle);
    }, []);

    return useMemo(
        () => ({
            selected,
            error,
            inputRef,
            setSelected,
            setError
        }),
        [selected, error, inputRef],
    );
};
