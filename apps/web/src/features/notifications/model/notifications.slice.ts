import { createEntityAdapter } from "@reduxjs/toolkit";

import { baseApi } from "@/shared";
import {
	NotificationsPushReturn__,
	NotificationsPushSchema__,
	notificationsType__,
	NotificationsUpdateReturn__,
	NotificationsUpdateSchema__,
} from "@/shared/model/serializable.types";

/**
 * adapter
 */
export const notificationsAdapter = createEntityAdapter<notificationsType__>({
	sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

/**
 * slice
 */
export const notificationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * /notifications/push
		 */
		push: builder.mutation<
			NotificationsPushReturn__,
			NotificationsPushSchema__
		>({
			query: (body) => ({
				url: "/notifications/push",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /notifications/update
		 */
		update: builder.mutation<
			NotificationsUpdateReturn__,
			NotificationsUpdateSchema__
		>({
			query: (body) => ({
				url: "/notifications/update",
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const {
	usePushMutation: useNotificationPushMutation,
	useUpdateMutation: useNotificationUpdateMutation,
} = notificationsApi;
