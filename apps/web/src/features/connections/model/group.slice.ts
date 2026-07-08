import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/shared/model/redux.types";
import { connections_groupType__ } from "@/shared/model/serializable.types";

export const groupAdapter = createEntityAdapter<connections_groupType__>({
	sortComparer: (a, b) => {
		// last connection
		if (a.last_connected_at !== b.last_connected_at) {
			if (!a.last_connected_at) return 1;
			if (!b.last_connected_at) return -1;

			return b.last_connected_at.localeCompare(a.last_connected_at);
		}

		// edit
		if (a.edited_at !== b.edited_at) {
			if (!a.edited_at) return 1;
			if (!b.edited_at) return -1;

			return b.edited_at.localeCompare(a.edited_at);
		}

		// creation
		if (a.created_at !== b.created_at) {
			return b.created_at.localeCompare(a.created_at);
		}

		// fallback
		return a.id.localeCompare(b.id);
	},
});

const initialState = groupAdapter.getInitialState();

export const groupSlice = createSlice({
	name: "connectionGroups",
	initialState,
	reducers: {
    reset: () => initialState,
    setAll: groupAdapter.setAll.bind(groupAdapter),
		upsertOne: groupAdapter.upsertOne.bind(groupAdapter),
		updateOne: groupAdapter.updateOne.bind(groupAdapter),
		upsertMany: groupAdapter.upsertMany.bind(groupAdapter),
		removeOne: groupAdapter.removeOne.bind(groupAdapter),
	},
});

export const groupActions = groupSlice.actions;
export const groupSelectors = groupAdapter.getSelectors<RootState>(
	(state) => state.connectionGroups,
);
export default groupSlice.reducer;
