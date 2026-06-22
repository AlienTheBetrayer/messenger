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
		 * toggle the connection popup groupId (or hides it)
		 * @param state root state
		 * @param action nanoid of the group or undefined
		 */
		setConnectionGroupId: (
			state,
			action: PayloadAction<string | undefined>,
		) => {
			state.connectSessionPopup.groupId = action.payload;
		},
	},
});

/**
 * actions + hooks
 */
export const { setConnectionGroupId } = uiSlice.actions;
