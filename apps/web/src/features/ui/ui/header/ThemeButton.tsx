import { Eclipse } from "lucide-react";
import { useTheme } from "next-themes";

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

export const ThemeButton = () => {
  // logic
	const { theme, setTheme, themes } = useTheme();

  // jsx
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className="aspect-square"
				>
					<Eclipse />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="leading-none font-medium">Avaialble themes</h4>
						<p className="text-sm text-muted-foreground">
							Select a theme from the list
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
