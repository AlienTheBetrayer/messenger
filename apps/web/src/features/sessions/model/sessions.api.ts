import { auth_sessionsType } from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { baseApi, RootState } from "@/shared";

/**
 * adapter
 */
export const sessionAdapter = createEntityAdapter<auth_sessionsType>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = sessionAdapter.getInitialState();

/**
 * api
 */
export const sessionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSessions: build.query<EntityState<auth_sessionsType, string>, void>({
			query: () => ({
				url: "/sessions",
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
