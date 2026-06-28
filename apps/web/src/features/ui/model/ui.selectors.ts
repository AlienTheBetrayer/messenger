import { createSelector } from "@reduxjs/toolkit";

import { selectGroupsData } from "@/features/connections/model/sessionGroup.api";
import { RootState } from "@/shared/model/redux.types";

export const selectConnectSessionsAwaitingGroupId = (state: RootState) => {
	return state.ui.connectSessions.awaiting?.groupId;
};

export const selectIsConnectSessionsAwaiting = (
	state: RootState,
	groupId: string,
) => {
	return state.ui.connectSessions.awaiting?.groupId === groupId;
};

export const selectAwaitingConnectionGroup = createSelector(
	[
		(state: RootState) => selectConnectSessionsAwaitingGroupId(state),
		(state: RootState) => selectGroupsData(state),
	],
	(groupId, groups) => {
		return groupId ? groups.entities[groupId] : null;
	},
);
