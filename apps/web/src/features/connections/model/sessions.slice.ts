import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/shared/model/redux.types";
import { auth_sessionsType__ } from "@/shared/model/serializable.types";

export const sessionAdapter = createEntityAdapter<auth_sessionsType__>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = sessionAdapter.getInitialState();

export const sessionSlice = createSlice({
	name: "authSessions",
	initialState,
	reducers: {
		setAll: sessionAdapter.setAll.bind(sessionAdapter),
		upsertOne: sessionAdapter.upsertOne.bind(sessionAdapter),
		upsertMany: sessionAdapter.upsertMany.bind(sessionAdapter),
		removeOne: sessionAdapter.removeOne.bind(sessionAdapter),
		addOne: sessionAdapter.addOne.bind(sessionAdapter),
	},
});

export const sessionActions = sessionSlice.actions;
export const sessionSelectors = sessionAdapter.getSelectors<RootState>(
	(state) => state.authSessions,
);
export default sessionSlice.reducer;
