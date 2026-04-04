import { useEffect, useMemo, useRef, useState } from "react";

export const useDragButton = (ref: React.RefObject<HTMLElement | null>) => {
    // states
    const [grabbing, setGrabbing] = useState<boolean>(false);

    // refs
    const initPos = useRef<[number, number]>([0, 0]);
    const initPosBox = useRef<[number, number]>([0, 0]);

    // hotkeys
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            switch (e.code) {
                case "Escape": {
                    setGrabbing(false);
                    break;
                }
            }
        };

        window.addEventListener("keydown", handle);
        return () => window.removeEventListener("keydown", handle);
    }, []);

    // moving
    useEffect(() => {
        if (!grabbing || !ref.current) {
            return;
        }

        const handle = (e: PointerEvent) => {
            if (!ref.current) {
                return;
            }

            const { clientX: x, clientY: y } = e;
            const diff = [x - initPos.current[0], y - initPos.current[1]];

            ref.current.style.left = `${initPosBox.current[0] + diff[0]}px`;
            ref.current.style.top = `${initPosBox.current[1] + diff[1]}px`;
        };

        window.addEventListener("pointermove", handle);
        return () => window.removeEventListener("pointermove", handle);
    }, [grabbing, ref]);

    // pointer toggling
    useEffect(() => {
        const handleUp = () => {
            setGrabbing(false);
        };

        const handleDown = (e: PointerEvent) => {
            if (!ref.current) {
                return;
            }

            const { clientX: x, clientY: y } = e;
            const rect = ref.current.getBoundingClientRect();

            initPos.current = [x, y];
            initPosBox.current = [rect.left, rect.top];
        };

        window.addEventListener("pointerup", handleUp);
        window.addEventListener("pointerdown", handleDown);
        return () => {
            window.removeEventListener("pointerup", handleUp);
            window.removeEventListener("pointerdown", handleDown);
        };
    }, [ref]);

    return useMemo(
        () => ({
            grabbing,
            setGrabbing,
        }),
        [grabbing],
    );
};
