import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/shared/model/redux.types";
import { usersType__ } from "@/shared/model/serializable.types";

export const userAdapter = createEntityAdapter<usersType__>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = userAdapter.getInitialState();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setAll: userAdapter.setAll.bind(userAdapter),
		upsertOne: userAdapter.upsertOne.bind(userAdapter),
		upsertMany: userAdapter.upsertMany.bind(userAdapter),
		removeOne: userAdapter.removeOne.bind(userAdapter),
		addOne: userAdapter.addOne.bind(userAdapter),
	},
});

export const userSelectors = userAdapter.getSelectors<RootState>(
	(state) => state.users,
);
export const userActions = userSlice.actions;
export default userSlice.reducer;
