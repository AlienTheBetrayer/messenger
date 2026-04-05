"use client";
import { useQueryState } from "@/src/shared/hooks/useQueryState";
import { Input } from "@/src/shared/ui/input/Input";

export default function HomePage() {
    const [filter, setFilter] = useQueryState("filter");
    const [sort, setSort] = useQueryState("sort");

    return (
        <ul className="flex flex-col items-center">
            <li className="flex items-center">
                <Input
                    placeholder="Filter..."
                    value={filter ?? ""}
                    onChange={(value) => setFilter(value)}
                />
            </li>

            <li className="flex items-center">
                <Input
                    placeholder="Sort..."
                    value={sort ?? ""}
                    onChange={(value) => setSort(value)}
                />
            </li>
        </ul>
    );
}
