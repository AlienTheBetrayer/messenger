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

    reset: () => UiSliceInitial,
    get: (draft) => draft,

		setConnectSessionsAwaitingGroupId: (
			draft,
			action: PayloadAction<{ groupId: string } | null>,
		) => {
			draft.connectSessions.awaiting = action.payload;
		},

		toggleConnectSessionsAwaitingGroupId: (
			draft,
			action: PayloadAction<{ groupId: string }>,
		) => {
			draft.connectSessions.awaiting =
				draft.connectSessions.awaiting?.groupId === action.payload.groupId
					? null
					: action.payload;
		},
	},
});

/**
 * actions + hooks
 */
export const {
	setConnectSessionsAwaitingGroupId,
  toggleConnectSessionsAwaitingGroupId,
} = uiSlice.actions;
