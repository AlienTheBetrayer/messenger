"use client";

import { useTheme } from "next-themes";

import { AvailableTheme, AvailableThemesList } from "@/features/ui/lib";
import { getThemeIcon } from "@/features/ui/ui/header/themebutton/getThemeIcon";
import { ThemeButtonContent } from "@/features/ui/ui/header/themebutton/ThemeButtonContent";
import { Combobox, ComboboxTrigger, useMounted } from "@/shared";

export const ThemeButton = () => {
	// states
	const { theme: _theme, setTheme } = useTheme();
	const mounted = useMounted();
	const theme = (mounted ? (_theme ?? "system") : "system") as AvailableTheme;

	// jsx
	return (
		<Combobox
			defaultValue="system"
			filter={null}
			items={AvailableThemesList}
			value={theme}
			onValueChange={(value) => {
				if (value) {
					setTheme(value);
				}
			}}
		>
			<ComboboxTrigger className="h-9 min-w-16 flex items-center justify-between gap-2 px-3 bg-secondary/15 border hover:bg-muted/70 transition-all text-xs font-medium capitalize tracking-tight rounded-md select-none">
				<div className="flex items-center gap-2">{getThemeIcon("dark")}</div>
			</ComboboxTrigger>

			<ThemeButtonContent theme={theme} />
		</Combobox>
	);
};
