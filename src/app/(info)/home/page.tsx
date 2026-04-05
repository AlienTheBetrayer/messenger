"use client";
import { useDebounce } from "@/src/shared/hooks/useDebounce";
import { useQueryState } from "@/src/shared/hooks/useQueryState";
import { Input } from "@/src/shared/ui/input/Input";

export default function HomePage() {
    // url
    const [sort, setSort] = useQueryState("sort");
    const [filter, setFilter] = useQueryState("filter");
    const [name, setName] = useQueryState("name");

    // debouncing
    const debouncedSort = useDebounce(sort, { onUpdate: setSort });
    const debouncedFilter = useDebounce(filter, { onUpdate: setFilter });
    const debouncedName = useDebounce(name, { onUpdate: setName });

    return (
        <ul className="flex flex-col items-center h-screen justify-center gap-1">
            <li className="flex items-center">
                <Input
                    placeholder="Filter..."
                    value={debouncedFilter.value}
                    onChange={(value) => debouncedFilter.setValue(value)}
                />
            </li>

            <li className="flex items-center">
                <Input
                    placeholder="Sort..."
                    value={debouncedSort.value}
                    onChange={(value) => debouncedSort.setValue(value)}
                />
            </li>

            <li className="flex items-center">
                <Input
                    placeholder="Name..."
                    value={debouncedName.value}
                    onChange={(value) => debouncedName.setValue(value)}
                />
            </li>
        </ul>
    );
}
