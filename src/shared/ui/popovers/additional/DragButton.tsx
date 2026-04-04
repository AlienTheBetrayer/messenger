import { Button } from "@/src/shared/ui/button/Button";
import { useDragButton } from "@/src/shared/ui/popovers/additional/useDragButton";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";

type Props = {
    ref: React.RefObject<HTMLElement | null>;
} & ComponentPropsWithoutRef<"button">;

export const DragButton = ({ ref, className, ...rest }: Props) => {
    const { grabbing, setGrabbing } = useDragButton(ref);

    return (
        <Button
            aria-label="drag"
            className={`absolute! rounded-lg! left-4 top-2 min-w-6! min-h-6! w-6! h-6! p-0! cursor-grab! active:cursor-grabbing! group
                    ${className ?? ""}`}
            onPointerDown={() => setGrabbing(true)}
            onPointerUp={() => setGrabbing(false)}
            {...rest}
        >
            <Image
                alt="x"
                width={16}
                height={16}
                src="/drag.svg"
                className={`${grabbing ? "rotate-360" : "rotate-180"} duration-500! group-active:animate-pulse select-none`}
                draggable={false}
            />
        </Button>
    );
};
