import { connected_sessionsType, SessionsReturn } from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { baseApi, RootState } from "@/shared";

/**
 * adapter
 */
export const sessionAdapter = createEntityAdapter<connected_sessionsType>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = sessionAdapter.getInitialState();

/**
 * api
 */
export const sessionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getSessions: build.query<EntityState<connected_sessionsType, string>, void>(
			{
				query: () => ({
					url: "/sessions",
					method: "GET",
				}),

				transformResponse: (response: SessionsReturn) => {
					const sessions: connected_sessionsType[] = [];

					for (const group of response.sessions) {
						if (!group.connected_sessions.length) {
							continue;
						}

						sessions.push(...group.connected_sessions);
					}

					return sessionAdapter.setAll(
						sessionAdapter.getInitialState(),
						sessions,
					);
				},
			},
		),
	}),
});

export const { useGetSessionsQuery } = sessionApi;

/**
 * selectors
 */
const selectGetSessionsResult = sessionApi.endpoints.getSessions.select();
const selectSessionsData = (state: RootState) =>
	selectGetSessionsResult(state).data ?? initialState;

export const sessionSelectors = sessionAdapter.getSelectors(selectSessionsData);
