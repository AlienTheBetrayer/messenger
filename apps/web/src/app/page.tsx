"use client";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/shared/ui";
import axios from "axios";
import { useState } from "react";
import { test } from "@prisma/client";
import { timeAgo } from "@/shared/lib/time";

export default function HomePage() {
    const [data, setData] = useState<test[]>([]);

    return (
        <main className="flex items-center justify-center min-h-screen w-screen m-auto">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Testing</CardTitle>
                    <CardDescription>Run this up for testing only!</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-1 ml-auto">
                    <Button
                        onClick={async () => {
                            const res = await axios.get("/api/test");
                            setData(res.data);
                        }}
                    >
                        Fetch
                    </Button>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            await axios.post("/api/test", {
                                data: "Hello",
                            });
                        }}
                    >
                        Post
                    </Button>
                </CardContent>
                <CardContent>
                    <ul className="flex flex-col gap-2 max-h-96 overflow-y-scroll">
                        {data.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Item variant="muted">
                                        <ItemContent>
                                            <ItemTitle className="flex">
                                                <span className="max-w-32 truncate">{item.id}</span>
                                                <span className="max-w-32 truncate">{item.value}</span>
                                            </ItemTitle>
                                            <ItemDescription>{timeAgo(item.created_at)}</ItemDescription>
                                        </ItemContent>
                                    </Item>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </main>
    );
}
