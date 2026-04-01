import { useDisabledScroll } from "@/src/shared/hooks/useDisabledScroll";
import { positionDialog } from "@/src/shared/ui/popovers/positionDialog";
import { DialogDirection } from "@/src/shared/ui/popovers/dialogDirection";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export const useModal = (config: { direction: DialogDirection }) => {
    // states
    const [isShown, setIsShown] = useState<boolean>(false);
    const { setIsDisabled } = useDisabledScroll();

    // refs
    const elementRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const modalElementRef = useRef<HTMLDivElement | null>(null);

    // observer
    useEffect(() => {
        if (!modalElementRef.current || !isShown) {
            return;
        }

        const observer = new ResizeObserver(() => {
            if (!modalElementRef.current || !isShown) {
                return;
            }

            positionDialog(modalRef, elementRef, config.direction);
        });

        observer.observe(modalElementRef.current);
        return () => observer.disconnect();
    }, [isShown, config.direction]);

    // dialog closing
    useEffect(() => {
        setIsDisabled(isShown);

        if (!modalRef.current) {
            return;
        }

        if (isShown) {
            modalRef.current.showModal();
            positionDialog(modalRef, elementRef, config.direction);
        } else {
            modalRef.current.close();
        }
    }, [isShown, setIsDisabled, config.direction]);

    // positioning
    useEffect(() => {
        const handle = () => {
            if (!isShown) {
                return;
            }

            positionDialog(modalRef, elementRef, config.direction);
        };

        window.addEventListener("resize", handle);
        window.addEventListener("scroll", handle);

        return () => {
            window.removeEventListener("resize", handle);
            window.removeEventListener("scroll", handle);
        };
    }, [isShown, config.direction]);

    // click away
    useEffect(() => {
        if (!isShown) {
            return;
        }

        const handle = (e: PointerEvent) => {
            if (!modalElementRef.current) {
                return;
            }

            if (modalElementRef.current.contains(e.target as Node)) {
                return;
            }

            const allModals = Array.from(document.querySelectorAll(".modal-element"));
            const topModal = allModals[allModals.length - 1];

            if (allModals.length > 1 && modalElementRef.current !== topModal) {
                return;
            }
            setIsShown(false);
        };

        window.addEventListener("pointerdown", handle, true);

        return () => {
            window.removeEventListener("pointerdown", handle, true);
        };
    }, [isShown]);

    const hide = useCallback(() => {
        setIsShown(false);
    }, []);

    return useMemo(
        () => ({
            elementRef,
            modalRef,
            modalElementRef,
            isShown,
            setIsShown,
            hide,
        }),
        [isShown, hide],
    );
};
