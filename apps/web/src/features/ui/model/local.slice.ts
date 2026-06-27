import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LocalSliceInitial } from "@/features/ui/model/local.lib";

/**
 * slice
 */
export const localSlice = createSlice({
	name: "local",
	initialState: LocalSliceInitial,
	reducers: {
		/**
		 * sessions
		 */

		setConnectSessionsCollapsedMenu: (
			draft,
			action: PayloadAction<boolean>,
		) => {
			draft.connectSessions.collapsedMenu = action.payload;
		},

		toggleConnectSessionsCollapsedMenu: (draft) => {
			draft.connectSessions.collapsedMenu =
				!draft.connectSessions.collapsedMenu;
		},
	},
});

/**
 * actions + hooks
 */
export const {
	setConnectSessionsCollapsedMenu,
	toggleConnectSessionsCollapsedMenu,
} = localSlice.actions;
