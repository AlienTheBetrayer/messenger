import { ThemeProvider } from "next-themes";

import { AvailableThemes } from "@/features/ui/lib/themes";

export const ThemesProvider = async ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<ThemeProvider
			attribute="data-theme"
			themes={AvailableThemes}
			enableSystem
		>
			{children}
		</ThemeProvider>
	);
};
