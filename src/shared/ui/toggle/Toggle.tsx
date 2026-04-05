import { Button } from "@/src/shared/ui/button/Button";
import { motion } from "motion/react";
import Image from "next/image";
import { ComponentPropsWithRef, useState } from "react";

type Props = { value?: boolean; onChange?: (flag: boolean) => void } & Omit<
    ComponentPropsWithRef<"button">,
    "onChange" | "value"
>;

export const Toggle = ({ className, children, value, onChange, onClick }: Props) => {
    const [internal, setInternal] = useState<boolean>(false);
    const toggled = value === undefined ? internal : value;

    return (
        <Button
            className={`border gap-3! ${toggled ? "border-blue-2!" : ""} ${className ?? ""} `}
            onClick={(e) => {
                if (value !== undefined) {
                    onChange?.(!toggled);
                } else {
                    setInternal((prev) => !prev);
                }
                onClick?.(e);
            }}
        >
            {children && children}

            <div
                className="flex w-12 relative group"
                style={{ justifyContent: toggled ? "flex-end" : "flex-start" }}
            >
                <motion.div
                    className="flex items-center absolute left-2 top-1/2 -translate-1/2 rounded-[0.45rem]"
                    animate={{
                        scale: toggled ? 1 : 0,
                        opacity: toggled ? 1 : 0,
                        x: toggled ? 0 : -10,
                    }}
                >
                    <Image
                        alt=""
                        width={16}
                        height={16}
                        src="/checkmark.svg"
                    />
                </motion.div>
                <motion.div
                    layout
                    animate={{
                        borderRadius: toggled ? "1rem" : "0.5rem",
                        background: toggled ? "var(--bg-6)" : "var(--bg-5)",
                    }}
                    className="flex items-center justify-center w-4.5 aspect-square bg-bg-5"
                />
            </div>
        </Button>
    );
};
