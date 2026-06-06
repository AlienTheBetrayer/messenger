import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import { notificationSlice } from "@/features/notifications/model/notification.slice";
import { NotificationType } from "@/features/notifications/types/notifications";

export const useNotificationDispatch = () => {
	// redux
	const dispatch = useDispatch();

	// functions
	const notify = useCallback((type: NotificationType, text: string) => {
		dispatch(
			notificationSlice.actions.addNotification({
				type,
				text,
			}),
		);
	}, [dispatch]);

	return useMemo(() => {
		return {
			notify,
		};
	}, [notify]);
};
