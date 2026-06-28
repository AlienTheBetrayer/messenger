import { createSelector } from "@reduxjs/toolkit";

import { selectIsAuthenticated } from "@/features/auth/model/auth.selectors";
import { RootState } from "@/shared/model/redux.types";

/**
 * runs only if you're authenticated
 */
export const selectConnectSessionsCollapsedMenu = createSelector(
	[
		(state: RootState) => selectIsAuthenticated(state),
		(state: RootState) => state.local.connectSessions.collapsedMenu,
	],
	(result, collapsed) => result && collapsed,
);
