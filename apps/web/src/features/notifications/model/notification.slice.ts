import {
	createEntityAdapter,
	createSlice,
	nanoid,
	PayloadAction,
} from "@reduxjs/toolkit";

import { Notification } from "@/features/notifications/types/notifications";
import { RootState } from "@/shared";

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
		 */
		addNotification: (
			state,
			action: PayloadAction<Pick<Notification, "type" | "text">>,
		) => {
			notificationAdapter.addOne(state, {
				...action.payload,
				id: nanoid(),
				createdAt: new Date().toISOString(),
			});
		},

		/**
		 * deletes a certain notification
		 * @param id id of the notification
		 */
		deleteNotification: (
			state,
			action: PayloadAction<Pick<Notification, "id">>,
		) => {
			notificationAdapter.removeOne(state, action.payload.id);
		},
	},
});

/**
 * selectors
 */
export const notificationSelectors =
	notificationAdapter.getSelectors<RootState>((state) => state.notifications);
