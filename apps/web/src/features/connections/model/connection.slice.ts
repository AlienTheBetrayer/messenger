import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/shared/model/redux.types";
import { connectionsType__ } from "@/shared/model/serializable.types";

export const connectionAdapter = createEntityAdapter<connectionsType__>({
  sortComparer: (a, b) => {
    if (a.created_at !== b.created_at) {
      return b.created_at.localeCompare(a.created_at);
    }

    return a.id.localeCompare(b.id);
  }
});

const initialState = connectionAdapter.getInitialState();

export const connectionSlice = createSlice({
	name: "connections",
	initialState,
	reducers: {
		setAll: connectionAdapter.setAll.bind(connectionAdapter),
		upsertOne: connectionAdapter.upsertOne.bind(connectionAdapter),
		upsertMany: connectionAdapter.upsertMany.bind(connectionAdapter),
		removeOne: connectionAdapter.removeOne.bind(connectionAdapter),
		addOne: connectionAdapter.addOne.bind(connectionAdapter),
	},
});

export const connectionActions = connectionSlice.actions;
export const connectionSelectors = connectionAdapter.getSelectors<RootState>(
	(state) => state.connections,
);
export default connectionSlice.reducer;
