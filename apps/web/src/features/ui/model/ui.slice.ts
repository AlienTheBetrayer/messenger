import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * initial + types
 */
export type UiSliceInitialType = {
	connectSessions: {
		awaiting: { groupId: string } | null;
	};
	routesForInterception: string[];
	isIntercepting: boolean;
};

export const UiSliceInitial: UiSliceInitialType = {
	connectSessions: {
		awaiting: null,
	},
	routesForInterception: [],
	isIntercepting: false,
};

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

		addInterceptionRoute: (draft, action: PayloadAction<string>) => {
			if (
				draft.routesForInterception.at(-1) === action.payload ||
				draft.isIntercepting
			) {
				return draft;
			}

			draft.routesForInterception.push(action.payload);
			if (draft.routesForInterception.length > 2) {
				draft.routesForInterception = draft.routesForInterception.slice(-2);
			}
		},

		setIsIntercepting: (draft, action: PayloadAction<boolean>) => {
			draft.isIntercepting = action.payload;

			if (!action.payload) {
				draft.routesForInterception = [];
			}
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
