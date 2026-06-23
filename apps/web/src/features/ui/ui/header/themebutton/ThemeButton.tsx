"use client";

import { useTheme } from "next-themes";

import { AvailableTheme, AvailableThemesList } from "@/features/ui/lib";
import { getThemeIcon } from "@/features/ui/ui/header/themebutton/getThemeIcon";
import {
	Combobox,
	ComboboxCollection,
	ComboboxContent,
	ComboboxGroup,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	useMounted,
} from "@/shared";

export const ThemeButton = () => {
	// states
	const { theme: _theme, setTheme } = useTheme();
	const theme = (_theme ?? "system") as AvailableTheme;

	// fallback
	if (!useMounted()) {
		return <div className="w-20 h-9 skeleton" />;
	}

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
			<ComboboxTrigger className="h-9 min-w-16 flex items-center justify-between gap-2 px-3 bg-secondary/15 border hover:bg-muted/20 transition-all text-xs font-medium capitalize tracking-tight rounded-md select-none">
				<div className="flex items-center gap-2">
					{getThemeIcon(theme)}
					<span>{theme.replace("-", " ")}</span>
				</div>
			</ComboboxTrigger>

			<ComboboxContent
				align="center"
				className="w-48 p-1 bg-popover rounded-xl  z-50 max-h-64 "
			>
				<ComboboxList className="fade-bottom">
					{(group: (typeof AvailableThemesList)[number], index: number) => (
						<ComboboxGroup
							key={group.value}
							items={group.items}
						>
							<ComboboxLabel className="text-[10px] font-medium tracking-wider text-muted-foreground/50 uppercase px-2.5 py-1 select-none">
								{group.value}
							</ComboboxLabel>

							<ComboboxCollection>
								{(item: AvailableTheme) => {
									const isActive = theme === item;
									return (
										<ComboboxItem
											key={item}
											value={item}
											className={`flex items-center justify-between text-xs font-medium tracking-tight px-2.5 py-1.5 cursor-pointer rounded-md transition-colors capitalize data-[highlighted]:bg-muted data-[highlighted]:text-foreground ${
												isActive
													? "bg-muted text-foreground font-semibold"
													: "text-muted-foreground/80"
											}`}
										>
											<div className="flex items-center gap-2">
												{getThemeIcon(item)}
												<span>{item.replace("-", " ")}</span>
											</div>
										</ComboboxItem>
									);
								}}
							</ComboboxCollection>
							{index < AvailableThemesList.length - 1 && (
								<ComboboxSeparator className="my-1 border-t border-border/40" />
							)}
						</ComboboxGroup>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
};
