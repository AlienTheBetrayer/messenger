"use client";

import { useTheme } from "next-themes";

import { Icons } from "@/features/ui/lib";
import {
	Button,
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared";

export const ThemeButton = ({ children }: { children?: React.ReactNode }) => {
	// logic
	const { theme, setTheme, themes } = useTheme();

	// jsx
	return (
		<Popover>
			<PopoverTrigger asChild>
				{children ?? (
					<Button
						variant="ghost"
						className="aspect-square"
					>
						{Icons.theme}
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent className="w-64">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="leading-none font-medium">
							Available themes
						</h4>
						<p className="text-sm text-muted-foreground">
							Select a theme from the list.
						</p>
					</div>

					<div className="grid gap-2">
						<Combobox
							items={themes}
							value={theme}
							onValueChange={(value) => {
								setTheme(value ?? "system");
							}}
						>
							<ComboboxInput placeholder="Select a theme" />
							<ComboboxContent>
								<ComboboxEmpty>No items found.</ComboboxEmpty>
								<ComboboxList>
									{(item: string) => (
										<ComboboxItem
											key={item}
											value={item}
										>
											{item}
										</ComboboxItem>
									)}
								</ComboboxList>
							</ComboboxContent>
						</Combobox>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
