import {
	GroupCreateReturn,
	GroupDeleteReturn,
	GroupEditReturn,
} from "@gravity/shared";
import { useCallback, useMemo } from "react";

import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button } from "@/shared";
import {
	ConnectionAddReturn__,
	ConnectionDeleteReturn__,
	ConnectionLoginReturn__,
} from "@/shared/model/serializable.types";

export const useConnectionNotifications = () => {
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

	// group-edit promise
	const connectionDelete = useCallback(
		(fn: () => Promise<ConnectionDeleteReturn__>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Disconnecting the connection..." />,
					text: "Disconnecting the connection...",
				}),
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Disconnection failed. ${message}`}
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
						text: `Disconnection failed. ${message}`,
					};
				},
				success: () => ({
					node: <NotificationLayout text="Connection has been deleted!" />,
					text: "Connection has been deleted!",
				}),
			});
		},
		[promise],
	);

	const connectionAdd = useCallback(
		(fn: () => Promise<ConnectionAddReturn__>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Connecting..." />,
					text: "Connecting...",
				}),
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Connection failed. ${message}`}
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
						text: `Connection failed. ${message}`,
					};
				},
				success: () => ({
					node: <NotificationLayout text="Connected!" />,
					text: "Connected!",
				}),
			});
		},
		[promise],
	);

	const connectionLogin = useCallback(
		(fn: () => Promise<ConnectionLoginReturn__>) => {
			promise(fn, {
				loading: () => ({
					node: <NotificationLayout text="Connecting..." />,
					text: "Connecting...",
				}),
				error: (e: unknown) => {
					const message = e instanceof Error ? e.message : "";

					return {
						node: (
							<NotificationLayout
								text={`Connection failed. ${message}`}
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
						text: `Connection failed. ${message}`,
					};
				},
				success: () => ({
					node: <NotificationLayout text="Connected!" />,
					text: "Connected!",
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
			connectionAdd,
			connectionDelete,
			connectionLogin,
		}),
		[
			groupCreate,
			groupEdit,
			groupDelete,
			connectionDelete,
			connectionLogin,
			connectionAdd,
		],
	);
};
