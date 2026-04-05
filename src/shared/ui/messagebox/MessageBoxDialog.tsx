import "./MessageBox.css";
import { Button } from "@/src/shared/ui/button/Button";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;
    onSelect: (res: "yes" | "no") => void;
};

export const MessageBoxDialog = ({ children, onSelect }: Props) => {
    // focusing
    const yesRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        requestAnimationFrame(() => {
            yesRef.current?.focus();
        });
    }, []);

    // jsx
    return (
        <div
            key="box"
            className="relative shell msg-box acrylic justify-between w-full gap-4! aspect-video"
        >
            <div className="flex flex-col gap-1 items-center">
                <span className="flex items-center gap-1">
                    <div className="msg-circle" />
                    <Image
                        alt=""
                        width={16}
                        height={16}
                        src="/type.svg"
                    />
                </span>
                <span className="flex items-center gap-1 text-center text-5!">
                    Are you <u>sure?</u>
                </span>
            </div>

            <span className="text-center w-full">{children}</span>

            <ul className="grid grid-cols-2 w-full gap-4">
                <li>
                    <Button
                        ref={yesRef}
                        onClick={() => onSelect?.("yes")}
                        className="w-full gap-2! yes-button"
                    >
                        <div className="yes-circle" />
                        <Image
                            alt=""
                            width={16}
                            height={16}
                            src="/checkmark.svg"
                        />
                        Yes
                    </Button>
                </li>

                <li>
                    <Button
                        onClick={() => onSelect?.("no")}
                        className="w-full gap-2 no-button"
                    >
                        <div className="no-circle" />
                        <Image
                            alt=""
                            width={16}
                            height={16}
                            src="/cross.svg"
                        />
                        No
                    </Button>
                </li>
            </ul>
        </div>
    );
};
