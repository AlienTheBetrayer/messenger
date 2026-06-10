import { generateId, notification_type } from "@gravity/shared";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	useNotificationPushMutation,
	useNotificationUpdateMutation,
} from "@/features/notifications/model/notifications.slice";
import { NotificationExtra } from "@/features/notifications/model/notifications.types";

/**
 * util hook to generate dispatch functions
 * @returns dispatcn helper functions
 */
export const useNotificationDispatch = () => {
	// auth`
	const auth = useAuth();
	const userId = auth.data?.user?.id;

	// redux
	const [push] = useNotificationPushMutation();
	const [update] = useNotificationUpdateMutation();

	/**
	 * dispatches a notification to the middleware
	 * @param params notification params
	 * @returns nothing
	 */
	const notify = useCallback(
		(params: {
			text: string;
			type: Exclude<notification_type, "promise">;
			extra?: Partial<NotificationExtra>;
		}) => {
			toast[params.type](params.text, params.extra);

			if (!userId) {
				return;
			}

			push({
				...params,
				userId,
			});
		},
		[push, userId],
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
				loading?: (ret: { id: string }) => {
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
			const id = generateId();

			const promise = fn();

			// toasting
			toast.promise<R>(promise, {
				loading: params.loading ? params.loading({ id }).node : undefined,
				success: (data) => params.success(data).node,
				error: (err: unknown) => params.error(err).node,
				...(params.extra ?? {}),
			});

			if (!userId) {
				return;
			}

			// loading dispatch
			push({
				id,
				userId,
				type: "promise",
				promiseStatus: "pending",
				text: params.loading ? params.loading({ id }).text : `loading ${id}`,
			});

			// success & error dispatch
			promise
				.then((data) => {
					update({
						id,
						userId,
						text: params.success(data).text,
						promiseStatus: "resolved",
					});
				})
				.catch((err: unknown) => {
					update({
						id,
						userId,
						text: params.error(err).text,
						promiseStatus: "rejected",
					});
				});
		},
		[update, push, userId],
	);

	return useMemo(() => {
		return {
			notify,
			promise,
		};
	}, [notify, promise]);
};
