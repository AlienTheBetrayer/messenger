"use clients";

import { useTheme } from "next-themes";

import { AvailableThemesList } from "@/features/ui/lib";
import { useFragment } from "@/shared/hooks/useFragment";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	MenubarSeparator,
} from "@/shared/ui";

export const Themes = () => {
	// themes
	const theme = useTheme();
	const fragment = useFragment();

	// jsx
	return (
		<DropdownMenu
			open={fragment.is("themes")}
			onOpenChange={(state) => {
				fragment.toggle("themes");
			}}
		>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="xs"
				>
					Themes
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{AvailableThemesList.map(({ value: group, items }, idx, arr) => (
					<DropdownMenuRadioGroup
						value={theme.theme}
						key={group}
						onValueChange={(value) => {
							theme.setTheme(value);
						}}
					>
						{items.map((item) => (
							<DropdownMenuRadioItem
								value={item}
								key={item}
							>
								<span className="capitalize text-xs">{item}</span>
							</DropdownMenuRadioItem>
						))}

						{idx !== arr.length - 1 && <MenubarSeparator />}
					</DropdownMenuRadioGroup>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
