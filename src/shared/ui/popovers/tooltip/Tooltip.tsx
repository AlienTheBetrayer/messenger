"use client";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { DialogDirection } from "@/src/shared/ui/popovers/dialogDirection";
import { useTooltip } from "@/src/shared/ui/popovers/tooltip/useTooltip";

type Props = {
    title?: string;
    text?: string;
    element?: React.ReactNode;
    direction?: DialogDirection;
    pointerEvents?: boolean;
    clickHides?: boolean;
    tooltipClassname?: string;
    className?: string;
    isEnabled?: boolean;
    isActive?: boolean;
    children: React.ReactNode;
};

export const Tooltip = React.memo(function TooltipFunction({
    title,
    text,
    direction = "bottom",
    tooltipClassname = "",
    className = "",
    clickHides = true,
    element,
    pointerEvents = false,
    isActive = true,
    isEnabled = true,
    children,
}: Props) {
    const { tooltipRef, elementRef, isShown, setIsShown } = useTooltip({ direction });

    return (
        <>
            {/* trigger element */}
            <div
                ref={elementRef}
                onPointerEnter={() => {
                    if (!isActive) {
                        return;
                    }

                    setIsShown(true);
                }}
                onPointerLeave={() => setIsShown(false)}
                onFocus={() => {
                    if (!isActive) {
                        return;
                    }

                    setIsShown(true);
                }}
                onBlur={() => setIsShown(false)}
                inert={!isEnabled}
                className={`w-fit h-fit ${!isEnabled ? "opacity-30" : ""} ${className ?? ""}`}
            >
                {children}
            </div>

            {/* tooltip portal */}
            {typeof window !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isShown && (
                            <div
                                popover="auto"
                                onPointerEnter={() => {
                                    if (pointerEvents) {
                                        setIsShown(true);
                                    }
                                }}
                                onPointerLeave={() => {
                                    if (pointerEvents) {
                                        setIsShown(false);
                                    }
                                }}
                                onToggle={(e) => {
                                    e.stopPropagation();
                                    if (e.newState === "closed" && clickHides) {
                                        setIsShown(false);
                                    }
                                }}
                                ref={tooltipRef}
                                className={`bg-transparent overflow-hidden whitespace-nowrap p-1 z-1000 text-center ${tooltipClassname ?? ""}`}
                                style={{
                                    pointerEvents: pointerEvents ? "all" : "none",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.7,
                                    }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.7,
                                    }}
                                    transition={{
                                        ease: [0.4, 0, 0.2, 1],
                                        duration: 0.3,
                                    }}
                                    className={`rounded-4xl ${element ? "" : "container py-1.5! px-3! rounded-full!"}`}
                                >
                                    {element ?? (
                                        <span className="flex flex-col items-center">
                                            {title && <span className="opacity-75">{title}</span>}
                                            {text && <span className="opacity-50">{text}</span>}
                                        </span>
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
});
