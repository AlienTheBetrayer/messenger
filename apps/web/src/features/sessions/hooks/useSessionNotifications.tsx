import { GroupCreateReturn, GroupEditReturn } from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button } from "@/shared";

export const useSessionNotifications = () => {
	// dispatcher
	const { promise } = useNotificationDispatch();

	// group-create promise
	const groupCreate = useCallback(
		(fn: () => Promise<GroupCreateReturn>) => {
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
					text: "Group creation failed.",
				}),
				success: ({ group }) => ({
					node: (
						<NotificationLayout
							text={`Group ${group.title} has been successfully created!`}
						/>
					),
					text: `Group ${group.title} has been successfully created!`,
				}),
			});
		},
		[promise],
	);

	// group-edit promise
	const groupEdit = useCallback(
		(fn: () => Promise<GroupEditReturn>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Editing the group..." />,
					text: "Editing the group...",
				}),
				error: () => ({
					node: (
						<NotificationLayout
							text="Group edit failed."
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
					text: "Group edit failed.",
				}),
				success: ({ group }) => ({
					node: (
						<NotificationLayout
							text={`Group ${group.title} has been successfully edited!`}
						/>
					),
					text: `Group ${group.title} has been successfully edited!`,
				}),
			});
		},
		[promise],
	);

	return useMemo(
		() => ({
			groupCreate,
			groupEdit,
		}),
		[groupCreate, groupEdit],
	);
};
