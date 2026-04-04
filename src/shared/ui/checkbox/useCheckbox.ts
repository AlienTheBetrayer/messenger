import { useCallback, useMemo, useState } from "react";

export const useCheckbox = (value?: boolean, onChange?: (flag: boolean) => void) => {
    // states
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const inputValue = value ?? isChecked;

    const toggle = useCallback(() => {
        if (!value) {
            setIsChecked((prev) => !prev);
        }
        onChange?.(!value);
    }, [value, onChange]);

    const keyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.code === "Space") {
                e.preventDefault();
                if (!value) {
                    setIsChecked((prev) => !prev);
                }
                onChange?.(!value);
            }
        },
        [value, onChange],
    );

    return useMemo(
        () => ({
            inputValue,
            toggle,
            keyDown,
        }),
        [inputValue, isChecked, keyDown, toggle],
    );
};
