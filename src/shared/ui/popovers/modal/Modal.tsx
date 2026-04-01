"use client";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { CloseButton } from "@/src/shared/ui/popovers/closebutton/CloseButton";
import { DialogDirection } from "@/src/shared/ui/popovers/dialogDirection";
import { useModal } from "@/src/shared/ui/popovers/modal/useModal";

type Props = {
    element?: (hide: () => void) => React.ReactNode;
    direction?: DialogDirection;
    contextMenu?: boolean;
    className?: string;
    tooltipClassName?: string;
    isEnabled?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
};

export const Modal = React.memo(function ModalFunction({
    element,
    direction = "bottom",
    className = "",
    tooltipClassName = "",
    contextMenu = false,
    isEnabled = true,
    isActive = true,
    children,
}: Props) {
    const { elementRef, modalRef, modalElementRef, isShown, hide, setIsShown } = useModal({ direction });

    return (
        <>
            {/* trigger element */}
            <div
                ref={elementRef}
                onClick={() => {
                    if (contextMenu || !isActive) {
                        return;
                    }

                    setIsShown((prev) => !prev);
                }}
                onContextMenu={(e) => {
                    if (!contextMenu || !isActive) {
                        return;
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    setIsShown((prev) => !prev);
                }}
                inert={!isEnabled}
                className={`w-fit h-fit ${!isEnabled ? "opacity-30" : ""} ${className ?? ""}`}
            >
                {children}
            </div>

            {/* modal portal */}
            {typeof window !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isShown && (
                            <dialog
                                onCancel={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setIsShown(false);
                                }}
                                onKeyDown={(e) => {
                                    switch (e.key) {
                                        case " ": {
                                            e.stopPropagation();
                                            break;
                                        }
                                    }
                                }}
                                onFocus={(e) => {
                                    e.stopPropagation();
                                }}
                                ref={modalRef}
                                onClick={(e) => e.stopPropagation()}
                                className="fixed z-1000"
                            >
                                <motion.div
                                    className={`rounded-4xl modal-element relative ${tooltipClassName ?? ""}`}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        ease: [0.4, 0, 0.2, 1],
                                        duration: 0.3,
                                    }}
                                    ref={modalElementRef}
                                >
                                    <CloseButton hide={hide} />
                                    {element?.(hide)}
                                </motion.div>
                            </dialog>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
});
