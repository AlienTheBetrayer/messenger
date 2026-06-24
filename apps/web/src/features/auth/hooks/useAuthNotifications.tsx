import { usersType } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button } from "@/shared";

/**
 * hook that returns notifications for promises for both auth and verify
 * @returns notifications for verify + auth
 */
export const useAuthNotifications = () => {
	// dispatcher
	const { promise } = useNotificationDispatch();

	// auth promise
	const auth = useCallback(
		(fn: () => Promise<boolean>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Sending the code..." />,
					text: "Sending the code...",
				}),
				error: () => ({
					node: (
						<NotificationLayout
							text="Code generation failed."
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
					node: <NotificationLayout text="Code has been successfully sent!" />,
					text: "Code has been successfully sent!",
				}),
			});
		},
		[promise],
	);

	const verify = useCallback(
		(fn: () => Promise<usersType>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Verifying the code..." />,
					text: "Verifying the code...",
				}),
				error: (err) => {
					const message = err instanceof Error ? err.message : "Invalid code.";

					return {
						node: <NotificationLayout text={message} />,
						text: message,
					};
				},
				success: (user) => ({
					node: <NotificationLayout text="Verified the code!" />,
					text: "Verified the code!",
				}),
			});
		},
		[promise],
	);

	return useMemo(
		() => ({
			auth,
			verify,
		}),
		[auth, verify],
	);
};
