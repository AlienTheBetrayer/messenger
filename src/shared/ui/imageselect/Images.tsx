import { useImageSelect } from "@/src/shared/ui/imageselect/useImageSelect";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type Props = Pick<ReturnType<typeof useImageSelect>, "selected"> & {
    value: string;
};

export const Images = ({ selected, value }: Props) => {
    return (
        <AnimatePresence>
            {value || selected ?
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0 }}
                    className="absolute inset-0"
                    key="img"
                >
                    <Image
                        fill
                        style={{ objectFit: "cover" }}
                        alt="image"
                        className="invert-0! rounded-full"
                        src={selected ? URL.createObjectURL(selected) : value}
                    />
                </motion.div>
            :   <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0 }}
                    className="absolute inset-0 flex items-center justify-center group"
                    key="select"
                >
                    <Image
                        alt="select"
                        width={24}
                        height={24}
                        src="/imageadd.svg"
                        className="duration-500! group-hover:scale-150! group-focus-visible:scale-150!"
                    />
                    <div className="absolute inset-0 loading z-2" />
                </motion.div>
            }
        </AnimatePresence>
    );
};
