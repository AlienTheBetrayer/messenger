/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "@/shared/model/redux.types";
import { usersType__ } from "@/shared/model/serializable.types";

export const userAdapter = createEntityAdapter<usersType__>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = userAdapter.getInitialState({
	idByUsername: {} as Record<string, string | null>,
});

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setAll(
			state,
			action: PayloadAction<usersType__[] | Record<string, usersType__>>,
		) {
			userAdapter.setAll(state, action.payload);

			Object.values(state.entities).forEach((user) => {
				if (user) {
					(state.idByUsername ??= {})[user.username] = user.id;
				}
			});
		},

		upsertOne(state, action: PayloadAction<usersType__>) {
			const user = action.payload;
			userAdapter.upsertOne(state, user);

			const existingUser = state.entities[user.id];
			if (existingUser && existingUser.username !== user.username) {
				(state.idByUsername ??= {})[existingUser.username] = null;
			}

			(state.idByUsername ??= {})[user.username] = user.id;
		},

		upsertMany(
			state,
			action: PayloadAction<usersType__[] | Record<string, usersType__>>,
		) {
			const users = Array.isArray(action.payload)
				? action.payload
				: Object.values(action.payload);

			users.forEach((user) => {
				if (!user) {
					return;
				}

				const existingUser = state.entities[user.id];
				if (existingUser && existingUser.username !== user.username) {
					(state.idByUsername ??= {})[existingUser.username] = null;
				}
				(state.idByUsername ??= {})[user.username] = user.id;
			});

			userAdapter.upsertMany(state, action.payload);
		},

		removeOne(state, action: PayloadAction<string>) {
			const id = action.payload;
			const user = state.entities[id];

			if (user) {
				(state.idByUsername ??= {})[user.username] = null;
			}

			userAdapter.removeOne(state, id);
		},

		addOne(state, action: PayloadAction<usersType__>) {
			const user = action.payload;
			userAdapter.addOne(state, user);
			(state.idByUsername ??= {})[user.username] = user.id;
		},
	},
});

export const userSelectors = userAdapter.getSelectors<RootState>(
	(state) => state.users,
);

export const userActions = userSlice.actions;
export default userSlice.reducer;
