import "./Input.css";
import { AnimatePresence } from "motion/react";
import { type ComponentPropsWithoutRef, ComponentPropsWithRef, useRef, useState } from "react";
import { InputCloseButton } from "@/src/shared/ui/input/CloseButton";

export type InputProps = {
    onChange?: (value: string) => void;
    isEnabled?: boolean;
    container?: ComponentPropsWithoutRef<"div">;
} & Omit<ComponentPropsWithRef<"input">, "onChange">;

export const Input = ({
    className,
    value,
    onChange,
    isEnabled = true,
    required,
    minLength,
    placeholder="Enter...",
    maxLength,
    container,
    children,
    ref,
    ...rest
}: InputProps) => {
    // value state logic
    const [data, setData] = useState<string>("");
    const inputValue = (value as string | undefined) ?? data;

    // refs
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={containerRef}
            className={`input-container ${!isEnabled ? "pointer-events-none opacity-30" : ""} `}
            inert={!isEnabled}
            {...container}
        >
            <input
                ref={ref}
                required={required && isEnabled}
                className={`input 
                    ${isEnabled && (required || minLength || maxLength) ? "invalid:underline decoration-wavy decoration-red-1 placeholder-shown:no-underline! valid:border-blue-1!" : ""} 
                    ${className ?? ""}`}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                    if (!value) {
                        setData(e.target.value);
                    }
                    onChange?.(e.target.value);
                }}
                {...rest}
            />

            {children}

            <AnimatePresence>
                {inputValue !== "" && (
                    <InputCloseButton
                        onClear={() => {
                            setData("");
                        }}
                        onChange={onChange}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
