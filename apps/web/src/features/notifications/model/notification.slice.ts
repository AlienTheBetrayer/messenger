import {
	createEntityAdapter,
	createSlice,
	nanoid,
	PayloadAction,
} from "@reduxjs/toolkit";

import {
	Notification,
	NotificationExtra,
	NotificationStatus,
	NotificationType,
} from "@/features/notifications/types/notifications";
import { RootState } from "@/shared";

export type AddNotificationAction = {
	id?: string;
  text: string;
	type: NotificationType;
  status?: NotificationStatus;
	extra?: Partial<NotificationExtra>;
};

/**
 * adapter
 */
const notificationAdapter = createEntityAdapter<Notification>({
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

/**
 * slice
 */
export const notificationSlice = createSlice({
	name: "notifications",
	initialState: notificationAdapter.getInitialState(),
	reducers: {
		/**
		 * adds a notification, generates id and createdAt
		 * @param type type of the notification
		 * @param text text content inside of the notification
		 * @param extra (optional extra data)
		 * @param id (optional custom id)
		 */
		addNotification: (state, action: PayloadAction<AddNotificationAction>) => {
			notificationAdapter.addOne(state, {
				...action.payload,
				id: action.payload.id ?? nanoid(),
				createdAt: new Date().toISOString(),
			});
		},

		/**
		 * deletes a certain notification
		 * @param id id of the notification
		 */
		deleteNotification: (state, action: PayloadAction<string>) => {
			notificationAdapter.removeOne(state, action.payload);
		},

		/**
		 * updates a certain notification
		 * @param id id of the notification
		 * @param text new text
		 */
		updateNotification: (
			state,
			action: PayloadAction<{ id: string; text: string }>,
		) => {
			notificationAdapter.updateOne(state, {
				id: action.payload.id,
				changes: {
					text: action.payload.text,
				},
			});
		},
	},
});

/**
 * selectors
 */
export const notificationSelectors =
	notificationAdapter.getSelectors<RootState>((state) => state.notifications);

export const { addNotification, deleteNotification, updateNotification } =
	notificationSlice.actions;
