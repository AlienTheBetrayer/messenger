import "../button/Button.css";
import { rippleEnable } from "@/src/shared/lib/ripple";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { type CSSProperties, forwardRef } from "react";

type Props = {
    children?: React.ReactNode;
    href: Url;
    className?: string;
    isEnabled?: boolean;
    onClick?: () => void;
    newTab?: boolean;
    style?: CSSProperties;
    ariaLabel?: string;
};

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(function LinkButton(
    { className, children, href, isEnabled, style, ariaLabel, onClick, newTab = false }: Props,
    ref,
) {
    // main jsx
    return (
        <Link
            ref={ref}
            href={href}
            style={style}
            target={`${newTab ? "_blank" : "_self"}`}
            rel="noopener noreferrer"
            className={`group ripple button
                    ${(isEnabled ?? true) !== true ? "pointer-events-none opacity-30" : ""} 
                    ${className ?? ""} 
                `}
            onClick={() => {
                onClick?.();
            }}
            aria-label={ariaLabel}
            onPointerDown={(e) => {
                rippleEnable(e);
            }}
            onPointerEnter={(e) => {
                if (e.buttons & 1) {
                    rippleEnable(e);
                }
            }}
        >
            {children}
        </Link>
    );
});
