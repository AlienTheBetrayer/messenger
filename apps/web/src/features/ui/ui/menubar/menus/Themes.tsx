"use clients";

import { useTheme } from "next-themes";

import { AvailableThemesList } from "@/features/ui/lib";
import {
	MenubarContent,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarTrigger,
} from "@/shared/ui";

export const Themes = () => {
	// themes
	const theme = useTheme();

	// jsx
	return (
		<MenubarMenu>
			<MenubarTrigger>Themes</MenubarTrigger>

			<MenubarContent>
				{AvailableThemesList.map(({ value: group, items }, idx, arr) => (
					<MenubarRadioGroup
						value={theme.theme}
            key={group}
            onValueChange={(value) => {
              theme.setTheme(value);
            }}
					>
						{items.map((item) => (
							<MenubarRadioItem
								value={item}
								key={item}
							>
								<span className="capitalize text-xs">{item}</span>
							</MenubarRadioItem>
						))}

						{idx !== arr.length - 1 && <MenubarSeparator />}
					</MenubarRadioGroup>
				))}
			</MenubarContent>
		</MenubarMenu>
	);
};
