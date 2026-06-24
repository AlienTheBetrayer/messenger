import { ApiErrorSchema, AuthMeReturn } from "@gravity/shared";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { ReduxProvider } from "@/shared";

export const GlobalProvider = ({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: AuthMeReturn | ApiErrorSchema;
}) => {
	return (
		<ReduxProvider auth={auth}>
			<ThemesProvider>
				<TooltipProvider delayDuration={250}>{children}</TooltipProvider>
			</ThemesProvider>
		</ReduxProvider>
	);
};
