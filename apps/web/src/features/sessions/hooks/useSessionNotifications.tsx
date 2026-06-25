import {
  GroupCreateReturn,
  GroupDeleteReturn,
  GroupEditReturn,
} from "@gravity/shared";
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
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Group creation failed. ${message}`}
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
						text: `Group creation failed. ${message}`,
					};
				},
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
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Group edit failed. ${message}`}
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
						text: `Group edit failed. ${message}`,
					};
				},
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

	// group-edit promise
	const groupDelete = useCallback(
		(fn: () => Promise<GroupDeleteReturn>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Deleting the group..." />,
					text: "Deleting the group...",
				}),
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Group deletion failed. ${message}`}
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
						text: `Group deletion failed. ${message}`,
					};
				},
				success: ({ group }) => ({
					node: (
						<NotificationLayout
							text={`Group ${group.title} has been successfully deleted!`}
						/>
					),
					text: `Group ${group.title} has been successfully deleted!`,
				}),
			});
		},
		[promise],
	);

	return useMemo(
		() => ({
			groupCreate,
			groupEdit,
			groupDelete,
		}),
		[groupCreate, groupEdit, groupDelete],
	);
};
