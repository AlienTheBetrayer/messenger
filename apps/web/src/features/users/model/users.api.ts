import { usersType } from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { RootState } from "@/shared";
import { baseApi } from "@/shared/model/redux.store";

/**
 * adapter
 */
export const usersAdapter = createEntityAdapter<usersType>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

export const initialState = usersAdapter.getInitialState();

/**
 * api
 */
export const usersApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<EntityState<usersType, string>, void>({
			query: () => ({
				url: "/users",
				method: "GET",
			}),

			keepUnusedDataFor: 99999999,
		}),
	}),
});

/**
 * selectors
 */
const selectGetUsersResult = usersApi.endpoints.getUsers.select();
const selectUsersData = (state: RootState) =>
	selectGetUsersResult(state).data ?? initialState;

export const usersSelectors = usersAdapter.getSelectors(selectUsersData);
