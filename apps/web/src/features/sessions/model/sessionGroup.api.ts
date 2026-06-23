import {
	connected_sessions_groupType,
	connected_sessionsType,
	SessionsReturn,
} from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import {
	sessionAdapter,
	sessionApi,
} from "@/features/sessions/model/session.api";
import { baseApi, RootState } from "@/shared";

export type ConnectedSessionGroup = connected_sessions_groupType & {
	sessionIds: string[];
};

/**
 * adapter
 */
export const groupAdapter = createEntityAdapter<ConnectedSessionGroup>({
	sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = groupAdapter.getInitialState();

/**
 * api
 */
export const groupApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getGroups: build.query<EntityState<ConnectedSessionGroup, string>, void>({
			query: () => ({
				url: "/sessions",
				method: "GET",
			}),

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled;
				const data = res.data as unknown as SessionsReturn;

				if (!("sessions" in data)) {
					return;
				}

				// normalizing
				const flatSessions: connected_sessionsType[] = [];
				const normalizedGroups: ConnectedSessionGroup[] = [];

				for (const group of data.sessions) {
					const sessionIds = group.connected_sessions.map((s) => s.id);

					normalizedGroups.push({
						...group,
						sessionIds,
					});

					flatSessions.push(...group.connected_sessions);
				}

				// dispatching
				dispatch(
					groupApi.util.upsertQueryData(
						"getGroups",
						undefined,
						groupAdapter.setAll(
							groupAdapter.getInitialState(),
							normalizedGroups,
						),
					),
				);

				dispatch(
					sessionApi.util.upsertQueryData(
						"getSessions",
						undefined,
						sessionAdapter.setAll(
							sessionAdapter.getInitialState(),
							flatSessions,
						),
					),
				);
			},
		}),
	}),
});

export const { useGetGroupsQuery } = groupApi;

/**
 * selectors
 */
const selectGetGroupsResult = groupApi.endpoints.getGroups.select();
const selectGroupsData = (state: RootState) =>
	selectGetGroupsResult(state).data ?? initialState;

export const groupSelectors = groupAdapter.getSelectors(selectGroupsData);
