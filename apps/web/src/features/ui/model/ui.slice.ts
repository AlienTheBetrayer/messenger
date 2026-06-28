import { ConnectionInitSchema } from "@gravity/shared";
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
			action: PayloadAction<{ groupId: string }>,
		) => {
			draft.connectSessions.awaiting = action.payload;
		},
	},
});

/**
 * actions + hooks
 */
export const { setConnectSessionsAwaitingGroupId } = uiSlice.actions;
