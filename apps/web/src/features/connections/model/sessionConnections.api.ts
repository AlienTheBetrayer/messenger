import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { baseApi, RootState } from "@/shared";
import {
	connected_sessionsType__,
	ConnectionsReturn__,
} from "@/shared/model/serializable.types";

/**
 * adapter
 */
export const sessionConnectionAdapter =
	createEntityAdapter<connected_sessionsType__>({
		sortComparer: (a, b) => a.id.localeCompare(b.id),
	});

const initialState = sessionConnectionAdapter.getInitialState();

/**
 * api
 */
export const sessionConnectionApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getConnectedSessions: build.query<
			EntityState<connected_sessionsType__, string>,
			void
		>({
			query: () => ({
				url: "/connections",
				method: "GET",
			}),

			keepUnusedDataFor: 99999999,

			transformResponse: (response: ConnectionsReturn__) => {
				const sessions: connected_sessionsType__[] = [];

				for (const group of response.connections) {
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
