import { useCallback, useMemo } from "react";

import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button } from "@/shared";

export const useSessionNotifications = () => {
	// dispatcher
	const { promise } = useNotificationDispatch();

	// group-create promise
	const groupCreate = useCallback(
		(fn: () => Promise<unknown>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Creating the group..." />,
					text: "Creating the group...",
				}),
				error: () => ({
					node: (
						<NotificationLayout
							text="Group creation failed."
							action={
								<Button
									onClick={() => {
										fn();
									}}
								>
									Retry
								</Button>
							}
						/>
					),
					text: "error",
				}),
				success: () => ({
					node: (
						<NotificationLayout text="Group has been successfully created!" />
					),
					text: "Group has been successfully created!",
				}),
			});
		},
		[promise],
	);

	return useMemo(
		() => ({
			groupCreate,
		}),
		[groupCreate],
	);
};
