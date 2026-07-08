import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { QueryStateModals } from "@/features/ui/ui/QueryStateModals";
import { ReduxProvider, TooltipProvider } from "@/shared";
import { AuthMeReturn__ } from "@/shared/model/serializable.types";

export const GlobalProvider = ({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: AuthMeReturn__ | null;
}) => {
	return (
		<ReduxProvider auth={auth}>
			<ThemesProvider>
				<TooltipProvider delayDuration={250}>
					<NotificationSonner />
					<QueryStateModals />

					{children}
				</TooltipProvider>
			</ThemesProvider>
		</ReduxProvider>
	);
};
