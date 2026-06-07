import { nanoid } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
	addNotification,
	updateNotification,
} from "@/features/notifications/model/notification.slice";
import {
	NotificationExtra,
	NotificationType,
} from "@/features/notifications/types/notifications";

/**
 * util hook to generate dispatch functions
 * @returns dispatcn helper functions
 */
export const useNotificationDispatch = () => {
	// redux
	const dispatch = useDispatch();

	/**
	 * dispatches a notification to the middleware
	 * @param params notification params
	 * @returns nothing
	 */
	const notify = useCallback(
		(params: {
			text: string;
			extra?: Partial<NotificationExtra>;
			type: Exclude<NotificationType, "promise">;
		}) => {
			toast[params.type](params.text, params.extra);

			dispatch(addNotification(params));
		},
		[dispatch],
	);

	/**
	 * dispatches a promise to the middleware
	 * @param promise promise to dispatch
	 * @param states states of the promise
	 */
	const promise = useCallback(
		<R>(
			fn: () => Promise<R>,
			params: {
				loading: (ret: { id: string }) => {
					node: React.ReactNode;
					text: string;
				};
				success: (ret: R) => {
					node: React.ReactNode;
					text: string;
				};
				error: (err: unknown) => {
					node: React.ReactNode;
					text: string;
				};
				extra?: Partial<NotificationExtra>;
			},
		) => {
			// generate id
			const id = nanoid();

			// loading dispatch
			dispatch(
				addNotification({
					id,
					type: "promise",
					text: params.loading({ id }).text,
				}),
			);

			const promise = fn();

			// toasting
			toast.promise<R>(promise, {
				loading: params.loading({ id }).node,
				success: (data) => params.success(data).node,
				error: (err: unknown) => params.error(err).node,
				...(params.extra ?? {}),
			});

			// success & error dispatch
			promise
				.then((data) => {
					dispatch(updateNotification({ id, text: params.success(data).text }));
				})
				.catch((err: unknown) => {
					dispatch(updateNotification({ id, text: params.error(err).text }));
				});
		},
		[dispatch],
	);

	return useMemo(() => {
		return {
			notify,
			promise,
		};
	}, [notify, promise]);
};
