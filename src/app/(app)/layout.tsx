import React from "react";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen flex relative overflow-hidden">
            <aside className="w-full fixed bottom-0 md:w-32 md:static backdrop-blur-xs z-1">
                <ul className="flex md:flex-col justify-evenly items-center h-16 md:h-full">
                    <li>
                        <span>messages</span>
                    </li>

                    <li>
                        <span>profile</span>
                    </li>

                    <li>
                        <span>settings</span>
                    </li>
                </ul>
            </aside>

            {children}
        </main>
    );
}
