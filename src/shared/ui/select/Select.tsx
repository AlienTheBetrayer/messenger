import "./Select.css";
import { motion } from "motion/react";
import { type ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { SelectList } from "@/src/shared/ui/select/SelectList";
import { useSelect } from "@/src/shared/ui/select/useSelect";
import { Modal } from "@/src/shared/ui/popovers/modal/Modal";
import { Button } from "@/src/shared/ui/button/Button";

type Props = {
    items: string[];
    onChange?: (item: string) => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onChange">;

export const Select = ({ items, className, onPointerDown, value, onChange, ...rest }: Props) => {
    // controller
    const { listRef, inputValue, width, recalculateWidth, keyDown, setSelectedItem } = useSelect(
        items,
        value as string | undefined,
        onChange,
    );

    return (
        <Modal
            additionalButtons={false}
            className="w-full"
            tooltipStyle={{
                width: "100vw",
                maxWidth: width,
            }}
            element={(hide) => (
                <SelectList
                    items={items}
                    inputValue={inputValue}
                    onChange={(item) => {
                        if (value) {
                            onChange?.(item);
                        } else {
                            setSelectedItem(item);
                        }
                        hide();
                    }}
                />
            )}
            direction="bottom"
        >
            <Button
                ref={listRef}
                role="list"
                type="button"
                className={`w-full ${className ?? ""}`}
                onKeyDown={keyDown}
                onPointerDown={(e) => {
                    recalculateWidth();
                    onPointerDown?.(e);
                }}
                {...rest}
            >
                <motion.span
                    key={`${inputValue}`}
                    initial={{ y: 5 }}
                    animate={{ y: 0 }}
                    className="flex items-center gap-1"
                >
                    <Image
                        alt=""
                        width={12}
                        height={12}
                        src="/select.svg"
                    />
                    {inputValue}
                </motion.span>

                <span className="ml-auto">
                    <small>{items.indexOf(inputValue) + 1}/{items.length}</small>
                </span>
            </Button>
        </Modal>
    );
};
