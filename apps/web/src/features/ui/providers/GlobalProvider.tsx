import { TooltipProvider } from "@radix-ui/react-tooltip";

import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { ReduxProvider } from "@/shared";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReduxProvider>
			<ThemesProvider>
				<TooltipProvider delayDuration={250}>{children}</TooltipProvider>
			</ThemesProvider>
		</ReduxProvider>
	);
};
