import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UiSliceInitial } from "@/features/ui/model/ui.lib";

/**
 * slice
 */
export const uiSlice = createSlice({
	name: "ui",
	initialState: UiSliceInitial,
	reducers: {
		/**
		 * connect sessions
		 */

		setConnectSessionsAwaitingGroupId: (
			draft,
			action: PayloadAction<string | undefined>,
		) => {
			draft.connectSessions.awaitingGroupId = action.payload;
		},
	},
});

/**
 * actions + hooks
 */
export const { setConnectSessionsAwaitingGroupId } = uiSlice.actions;
