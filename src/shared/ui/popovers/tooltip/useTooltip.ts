import { positionDialog } from "@/src/shared/ui/popovers/positionDialog";
import { DialogDirection } from "@/src/shared/ui/popovers/dialogDirection";
import { useEffect, useMemo, useRef, useState } from "react";

export const useTooltip = (config: { direction: DialogDirection }) => {
    // states
    const [isShown, setIsShown] = useState<boolean>(false);

    // refs
    const elementRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    // dialog closing
    useEffect(() => {
        if (!tooltipRef.current) {
            return;
        }

        if (isShown) {
            tooltipRef.current.showPopover();
            positionDialog(tooltipRef, elementRef, config.direction);
        }
    }, [isShown, config.direction]);

    // positioning
    useEffect(() => {
        const handle = () => {
            positionDialog(tooltipRef, elementRef, config.direction);
        };
        handle();

        window.addEventListener("resize", handle);
        window.addEventListener("scroll", handle);

        return () => {
            window.removeEventListener("resize", handle);
            window.removeEventListener("scroll", handle);
        };
    }, [isShown, config.direction]);

    return useMemo(
        () => ({
            isShown,
            elementRef,
            tooltipRef,
            setIsShown,
        }),
        [isShown],
    );
};
