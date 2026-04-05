import { Button } from "@/src/shared/ui/button/Button";
import { InputProps } from "@/src/shared/ui/input/Input";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type Props = {
    inputValue: string;
    onClear: () => void;
    onChange: InputProps["onChange"];
};
export const InputCloseButton = ({ inputValue, onClear, onChange }: Props) => {
    return (
        <AnimatePresence>
            <motion.div
                className="absolute right-2 top-1/2 -translate-1/2"
                initial={false}
                animate={!inputValue ? { opacity: 0, scale: 0, x: 5 } : { opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Button
                    className={`rounded-lg! min-w-6! min-h-6! w-6! h-6! flex! items-center! justify-center! p-0!`}
                    onClick={() => {
                        if (!onChange) {
                            onClear();
                        }
                        onChange?.("");
                    }}
                >
                    <Image
                        alt=""
                        width={15}
                        height={15}
                        src="/delete.svg"
                    />
                </Button>
            </motion.div>
        </AnimatePresence>
    );
};
