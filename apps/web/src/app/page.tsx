"use client";
import { Button } from "@/shared/ui";

export default function Home() {
    return (
        <div className="shell flex w-fit flex-col gap-2 m-auto">
            <Button>Button</Button>
            <Button variant="outline">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="ghost">Button</Button>
            <Button variant="destructive">Button</Button>
            <Button variant="success">Button</Button>
            <Button variant="blue">Button</Button>
            <Button variant="link">Button</Button>
        </div>
    );
}
