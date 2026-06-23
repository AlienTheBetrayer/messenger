import { Monitor, Moon, Sun, Terminal } from "lucide-react";

import { AvailableTheme } from "@/features/ui/lib";

/**
 * gets the icon of the theme based on its name
 * @param name name of the theme
 * @returns icon
 */
export const getThemeIcon = (name: AvailableTheme) => {
	switch (true) {
		case name.includes("light"): {
			return <Sun className="size-3.5 text-muted-foreground" />;
		}
		case name.includes("system"): {
			return <Monitor className="size-3.5 text-muted-foreground" />;
		}
		case name.includes("amoled") || name.includes("contrast"): {
			return <Terminal className="size-3.5 text-muted-foreground" />;
		}
		case name.includes("dark"): {
			return <Moon className="size-3.5 text-muted-foreground" />;
		}
		default: {
			return <Moon className="size-3.5 text-muted-foreground" />;
		}
	}
};
