import "../button/Button.css";
import { rippleEnable } from "@/src/shared/lib/ripple";
import { useCheckbox } from "@/src/shared/ui/checkbox/useCheckbox";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type Props = {
    onChange?: (flag: boolean) => void;
    value?: boolean;
} & Omit<Omit<ComponentPropsWithoutRef<"button">, "onChange">, "value">;

export const Checkbox = ({ children, value, onChange, className, ...rest }: Props) => {
    // controller
    const { toggle, keyDown, inputValue } = useCheckbox(value, onChange);

    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={inputValue}
            aria-label={typeof children === "string" ? children : undefined}
            onClick={toggle}
            onKeyDown={keyDown}
            onPointerDown={(e) => {
                rippleEnable(e);
            }}
            onPointerEnter={(e) => {
                if (e.buttons & 1) {
                    rippleEnable(e);
                }
            }}
            className={`button gap-2! ripple flex justify-center! w-full focus-within:outline-blue-1! ${className ?? ""}`}
            {...rest}
        >
            <div
                className={`flex items-center justify-center aspect-square grow shrink-0 rounded-xl outline-2 outline-bg-3 duration-300 ease-out
                ${inputValue ? "outline-blue-1" : ""}`}
            >
                <Image
                    src="/checkmark.svg"
                    width={14}
                    height={14}
                    alt=""
                    className={`${inputValue ? "opacity-100 scale-100" : "opacity-0 scale-10"} transition-all! duration-300! ease-in-out`}
                />
            </div>
            {children && <span className="flex gap-1 w-full">{children}</span>}
        </button>
    );
};
