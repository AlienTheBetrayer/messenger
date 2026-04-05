import "./Buttons.css";
import { Button } from "@/src/shared/ui/button/Button";
import { useImageSelect } from "@/src/shared/ui/imageselect/useImageSelect";
import { Tooltip } from "@/src/shared/ui/popovers/tooltip/Tooltip";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Props = Pick<ReturnType<typeof useImageSelect>, "selected" | "inputRef" | "setSelected"> & {
    onChange: (file: File | null) => void;
    value: string;
};

export const Buttons = ({ selected, inputRef, setSelected, onChange, value }: Props) => {
    return (
        <AnimatePresence>
            {(selected || value) && (
                <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.75 }}
                    transition={{ type: "spring", bounce: 0 }}
                    className="image-select-buttons absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-blend-difference"
                >
                    {selected ?
                        <>
                            <Tooltip text="Cancel">
                                <Button
                                    onClick={() => {
                                        setSelected(undefined);
                                        if (inputRef.current) {
                                            inputRef.current.value = "";
                                        }
                                    }}
                                >
                                    <Image
                                        alt=""
                                        width={16}
                                        height={16}
                                        src="/cross.svg"
                                    />
                                </Button>
                            </Tooltip>

                            <Tooltip text="Confirm">
                                <Button
                                    onClick={() => {
                                        onChange(selected);
                                        setSelected(undefined);
                                        if (inputRef.current) {
                                            inputRef.current.value = "";
                                        }
                                    }}
                                >
                                    <Image
                                        alt=""
                                        width={16}
                                        height={16}
                                        src="/checkmark.svg"
                                    />
                                </Button>
                            </Tooltip>
                        </>
                    :   value && (
                            <Tooltip text="Delete">
                                <Button
                                    onClick={() => {
                                        onChange(null);
                                    }}
                                >
                                    <Image
                                        alt=""
                                        width={16}
                                        height={16}
                                        src="/delete.svg"
                                    />
                                </Button>
                            </Tooltip>
                        )
                    }
                </motion.div>
            )}
        </AnimatePresence>
    );
};
