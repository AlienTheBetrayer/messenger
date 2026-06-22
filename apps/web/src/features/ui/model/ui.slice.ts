import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
	UiSliceInitial,
	UiSliceVisibilityKey,
} from "@/features/ui/model/ui.lib";

/**
 * slice
 */
export const uiSlice = createSlice({
	name: "ui",
	initialState: UiSliceInitial,
	reducers: {
		/**
		 * toggle the visibility for a specific key
		 * @param state root state
		 * @param action key - key to toggle
		 */
		toggleVisibility: (state, action: PayloadAction<UiSliceVisibilityKey>) => {
			state.visibility[action.payload] = !state.visibility[action.payload];
		},

		/**
		 * sets the visibility for a specific key
		 * @param state root state
		 * @param action key - key to show/hide, value - new value (false means hidden)
		 */
		setVisibility(
			state,
			action: PayloadAction<{
				key: UiSliceVisibilityKey;
				value: boolean;
			}>,
		) {
			state.visibility[action.payload.key] = action.payload.value;
		},
	},
});

/**
 * actions + hooks
 */
export const { toggleVisibility, setVisibility } = uiSlice.actions;
