"use client";

import { Button } from "@/shared/ui";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-bg-0 font-sans">
            <main className="flex flex-col items-center gap-4 py-32 px-16 sm:items-start">
                <h1 className="text-1 font-bold text-bg-10 mb-4">UI Toolkit Demo</h1>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="danger">Danger Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                    <Button
                        variant="primary"
                        size="lg"
                    >
                        Large Button
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                    >
                        Small Button
                    </Button>
                </div>
            </main>
        </div>
    );
}
