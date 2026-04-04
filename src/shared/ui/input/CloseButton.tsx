import { Button } from "@/src/shared/ui/button/Button";
import { InputProps } from "@/src/shared/ui/input/Input";
import { motion } from "motion/react";
import Image from "next/image";

export const InputCloseButton = ({ onClear, onChange }: { onClear: () => void; onChange: InputProps["onChange"] }) => {
    return (
        <motion.div
            className="absolute right-2 top-1/2 -translate-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
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
    );
};
