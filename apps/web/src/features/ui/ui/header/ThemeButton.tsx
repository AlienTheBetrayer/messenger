"use client";

import { Monitor, Moon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";

import { AvailableTheme, AvailableThemesList } from "@/features/ui/lib";
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
	const theme = _theme ?? "system";
	const mounted = useMounted();

	if (!mounted) {
		return <div className="h-9 w-24 skeleton" />;
	}

	// ui states
	const getThemeIcon = (name: string) => {
		const fallback = (name || "system").toLowerCase();
		if (fallback.includes("light"))
			return <Sun className="size-3.5 text-muted-foreground" />;
		if (fallback.includes("system"))
			return <Monitor className="size-3.5 text-muted-foreground" />;
		if (fallback.includes("amoled") || fallback.includes("contrast")) {
			return <Terminal className="size-3.5 text-muted-foreground" />;
		}
		return <Moon className="size-3.5 text-muted-foreground" />;
	};

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
			<ComboboxTrigger className="h-9 min-w-16 flex items-center justify-between gap-2 px-3 bg-background border border-border/50 hover:bg-muted/20 transition-all text-xs font-medium capitalize tracking-tight rounded-md select-none">
				<div className="flex items-center gap-2">
					{getThemeIcon(theme)}
					<span suppressHydrationWarning>{theme.replace("-", " ")}</span>
				</div>
			</ComboboxTrigger>

			<ComboboxContent
				align="center"
				className="w-48 p-1 bg-popover rounded-xl mt-1 z-50 max-h-64 "
			>
				<ComboboxList className="shadow-xl [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)] ">
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
											indicator={false}
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

											{isActive && (
												<span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-1 py-0.5 rounded-sm scale-90 select-none tracking-tight">
													Selected
												</span>
											)}
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
