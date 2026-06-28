import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/model/redux.store";
import { RootState } from "@/shared/model/redux.types";
import { auth_sessionsType__ } from "@/shared/model/serializable.types";

/**
 * adapter
 */
export const sessionAdapter = createEntityAdapter<auth_sessionsType__>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = sessionAdapter.getInitialState();

/**
 * api
 */
export const sessionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSessions: build.query<EntityState<auth_sessionsType__, string>, void>({
			query: () => ({
				url: "/connections",
				method: "GET",
			}),

			keepUnusedDataFor: 99999999,
		}),
	}),
});

/**
 * selectors
 */
const selectGetSessionsResult = sessionApi.endpoints.getSessions.select();
const selectSessionsData = (state: RootState) =>
	selectGetSessionsResult(state).data ?? initialState;

export const sessionSelectors = sessionAdapter.getSelectors(selectSessionsData);
