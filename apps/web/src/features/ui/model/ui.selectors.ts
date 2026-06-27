import { RootState } from "@/shared";

export const selectConnectSessionsAwaitingGroupId = (state: RootState) => {
	return state.ui.connectSessions.awaitingGroupId;
};

