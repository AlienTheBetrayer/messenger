"use client";
import "./Button.css";
import { rippleEnable } from "@/src/shared/lib/ripple";
import { ComponentPropsWithoutRef } from "react";

type Props = {
    isEnabled?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button = ({ isEnabled = true, onPointerDown, onPointerEnter, className, children, ...rest }: Props) => {
    return (
        <button
            disabled={!isEnabled}
            className={`button ripple ${className ?? ""} ${isEnabled ? "" : "opacity-30 pointer-events-none"}`}
            onPointerDown={(e) => {
                rippleEnable(e);
                onPointerDown?.(e);
            }}
            onPointerEnter={(e) => {
                if (e.buttons & 1) {
                    rippleEnable(e);
                }
                onPointerEnter?.(e);
            }}
            {...rest}
        >
            {children}
        </button>
    );
};
