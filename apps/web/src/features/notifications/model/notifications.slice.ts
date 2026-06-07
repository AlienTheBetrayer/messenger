import {
	NotificationsPushSchema,
	notificationsType,
	NotificationsUpdateSchema,
} from "@gravity/shared";
import { createEntityAdapter } from "@reduxjs/toolkit";

import { baseApi } from "@/shared";

/**
 * adapter
 */
const notificationsAdapter = createEntityAdapter<notificationsType>({
	sortComparer: (a, b) =>
		b.created_at.toISOString().localeCompare(a.created_at.toISOString()),
});

/**
 * slice
 */
export const notificationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * /notifications/push
		 */
		push: builder.mutation<notificationsType, NotificationsPushSchema>({
			query: (body) => ({
				url: "/notifications/push",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /notifications/update
		 */
		update: builder.mutation<notificationsType, NotificationsUpdateSchema>({
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
