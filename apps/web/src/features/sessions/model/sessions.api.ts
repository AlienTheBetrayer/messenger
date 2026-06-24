import { auth_sessionType } from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { baseApi, RootState } from "@/shared";

/**
 * adapter
 */
export const sessionAdapter = createEntityAdapter<auth_sessionType>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = sessionAdapter.getInitialState();

/**
 * api
 */
export const sessionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSessions: build.query<EntityState<auth_sessionType, string>, void>({
			query: () => ({
				url: "/sessions",
				method: "GET",
			}),
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
