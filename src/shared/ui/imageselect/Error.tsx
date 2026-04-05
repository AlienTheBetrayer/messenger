import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type Props = {
    error: boolean;
    mbLimit: number;
};

export const Error = ({ error, mbLimit }: Props) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.75 }}
                    transition={{ type: "spring", bounce: 0 }}
                    className="absolute bottom-6 flex items-center gap-1"
                >
                    <div className="w-1 h-1 rounded-full bg-red-1" />
                    <Image
                        alt=""
                        width={16}
                        height={16}
                        src="/cross.svg"
                    />
                    Size {">"} {mbLimit}MB!
                </motion.span>
            )}
        </AnimatePresence>
    );
};
