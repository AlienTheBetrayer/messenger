import { connected_sessionsType, SessionsReturn } from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { RootState } from "@/shared";
import { baseApi } from "@/shared/model/redux.store";

/**
 * adapter
 */
export const sessionConnectionAdapter =
	createEntityAdapter<connected_sessionsType>({
		sortComparer: (a, b) => a.id.localeCompare(b.id),
	});

const initialState = sessionConnectionAdapter.getInitialState();

/**
 * api
 */
export const sessionConnectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getConnectedSessions: build.query<
			EntityState<connected_sessionsType, string>,
			void
		>({
			query: () => ({
				url: "/sessions",
				method: "GET",
			}),

			keepUnusedDataFor: 99999999,

			transformResponse: (response: SessionsReturn) => {
				const sessions: connected_sessionsType[] = [];

				for (const group of response.sessions) {
					if (!group.connected_sessions.length) {
						continue;
					}

					sessions.push(...group.connected_sessions);
				}

				return sessionConnectionAdapter.setAll(
					sessionConnectionAdapter.getInitialState(),
					sessions,
				);
			},
		}),
	}),
});

export const { useGetConnectedSessionsQuery } = sessionConnectionApi;

/**
 * selectors
 */
const selectGetConnectedSessionsResult =
	sessionConnectionApi.endpoints.getConnectedSessions.select();
const selectConnectedSessionsData = (state: RootState) =>
	selectGetConnectedSessionsResult(state).data ?? initialState;

export const sessionConnectionsSelectors =
	sessionConnectionAdapter.getSelectors(selectConnectedSessionsData);
