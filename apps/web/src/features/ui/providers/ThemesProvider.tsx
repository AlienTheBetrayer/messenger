import { ThemeProvider } from "next-themes";

import { themes } from "@/features/ui/lib/themes";

type Props = {
	children: React.ReactNode;
};

export const ThemesProvider = ({ children }: Props) => {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme="system"
			themes={themes}
		>
			{children}
		</ThemeProvider>
	);
};
