import { RootState } from "@/shared/model/redux.types";

export const selectConnectSessionsCollapsedMenu = (state: RootState) =>
	state.local.connectSessions.collapsedMenu;
