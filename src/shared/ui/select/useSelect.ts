import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useSelect = (items: string[], value: string | undefined, onChange?: (item: string) => void) => {
    // states
    const [selectedItem, setSelectedItem] = useState<string>(items.length > 0 ? items[0] : "");
    const inputValue = (value as string | undefined) ?? selectedItem;
    const [width, setWidth] = useState<number>(0);

    // refs
    const listRef = useRef<HTMLButtonElement | null>(null);

    // width calculating
    const recalculateWidth = useCallback(() => {
        if (!listRef.current) {
            setWidth(0);
            return;
        }

        const bounds = listRef.current.getBoundingClientRect();
        setWidth(bounds.width);
    }, [listRef]);

    useEffect(() => {
        window.addEventListener("resize", recalculateWidth);
        requestAnimationFrame(() => {
            recalculateWidth();
        });
        return () => window.removeEventListener("resize", recalculateWidth);
    }, [recalculateWidth]);

    // key handler
    const keyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
            const id = items.indexOf(inputValue);

            switch (e.code) {
                case "ArrowUp": {
                    const item = items[id > 0 ? id - 1 : items.length - 1];

                    if (value) {
                        onChange?.(item);
                    } else {
                        setSelectedItem(item);
                    }
                    break;
                }
                case "ArrowDown": {
                    const item = items[id + 1 < items.length ? id + 1 : 0];

                    if (value) {
                        onChange?.(item);
                    } else {
                        setSelectedItem(item);
                    }
                    break;
                }
            }
        },
        [items, inputValue, value, onChange],
    );

    return useMemo(
        () => ({
            inputValue,
            width,
            listRef,
            keyDown,
            setSelectedItem,
            recalculateWidth,
        }),
        [width, inputValue, keyDown, recalculateWidth],
    );
};
