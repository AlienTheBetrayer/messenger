"use client";

import { useParams } from "next/navigation";

export const MessagesLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const { type } = useParams<{ type?: string }>();

    return (
        <div
            className="flex absolute lg:static inset-0 w-full bg-bg-4 transition-all duration-300 lg:translate-0! ease-out z-2"
            style={{
                translate: type ? "0 0" : "100% 0px",
            }}
        >
            {children}
        </div>
    );
};
