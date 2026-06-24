import { AuthLogoutReturn } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import {
	NotificationLayout,
	useNotificationDispatch,
} from "@/features/notifications";

export const useAuthButtonNotifications = () => {
	const { promise } = useNotificationDispatch();

	const logout = useCallback(
		(fn: () => Promise<AuthLogoutReturn>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Logging out..." />,
					text: "Logging out...",
				}),
				error: (error: unknown) => {
					const message = error instanceof Error ? error.message : "";

					return {
						node: <NotificationLayout text={`Error logging out. ${message}`} />,
						text: `Error logging out. ${message}`,
					};
				},
				success: () => ({
					node: <NotificationLayout text="Successfully logged out!" />,
					text: "Successfully logged out!",
				}),
			});
		},
		[promise],
	);

	return useMemo(
		() => ({
			logout,
		}),
		[logout],
	);
};
