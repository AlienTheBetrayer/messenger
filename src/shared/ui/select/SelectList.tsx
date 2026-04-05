import "./Select.css";
import { Button } from "@/src/shared/ui/button/Button";
import { motion } from "motion/react";
import Image from "next/image";

type Props = {
    inputValue: string;
    items: string[];
    onChange: (item: string) => void;
};

export const SelectList = ({ inputValue, items, onChange }: Props) => {
    if (typeof window === "undefined") {
        return null;
    }

    return (
        <motion.ul
            initial={{ height: "0px", y: -10 }}
            animate={{ height: "auto", y: 0 }}
            exit={{ height: "0px", y: -10 }}
            className="select-list"
        >
            {items.map((item) => (
                <li
                    key={item}
                    className="w-full"
                >
                    <Button
                        type="button"
                        className="select-item group"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(item);
                        }}
                    >
                        <div
                            className={`w-4 h-4 aspect-square outline-2 p-0 flex items-center justify-center
                                                ${item === inputValue ? "outline-blue-1 rounded-lg" : "outline-bg-5 rounded-sm"}
                                                group-hover:rounded-lg group-hover:outline-bg-6 group-active:outline-bg-7 transition-all duration-500 
                                                group-focus-visible:rounded-lg group-focus-visible:outline-bg-6`}
                        >
                            {item === inputValue && (
                                <Image
                                    src="/checkmark.svg"
                                    width={14}
                                    height={14}
                                    alt="+"
                                />
                            )}
                        </div>

                        <span className="whitespace-nowrap text-ellipsis text-left">{item}</span>
                    </Button>
                </li>
            ))}
        </motion.ul>
    );
};
