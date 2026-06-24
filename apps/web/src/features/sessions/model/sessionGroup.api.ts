import {
	auth_sessionType,
	connected_sessions_groupType,
	connected_sessionsType,
	SessionsReturn,
	usersType,
} from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import {
	sessionConnectionAdapter,
	sessionConnectionApi,
} from "@/features/sessions/model/sessionConnections.api";
import {
	sessionAdapter,
	sessionApi,
} from "@/features/sessions/model/sessions.api";
import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { RootState } from "@/shared";
import { baseApi } from "@/shared/model/redux.store";

export type ConnectedSessionGroup = connected_sessions_groupType & {
	connectedSessionIds: string[];
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
				const normalizedGroups: ConnectedSessionGroup[] = [];
				const flatConnectedSessions: connected_sessionsType[] = [];
				const flatSessions: auth_sessionType[] = [];
				const users: usersType[] = [];

				for (const group of data.sessions) {
					const connectedSessionIds = group.connected_sessions.map((s) => s.id);

					const { connected_sessions, ...groupNoSessions } = group;
					normalizedGroups.push({
						...groupNoSessions,
						connectedSessionIds,
					});

					for (const connectedSession of connected_sessions) {
						const { users: user, ...session } = connectedSession.auth_sessions;
						flatSessions.push(session);

						users.push(user);
					}

					flatConnectedSessions.push(
						...group.connected_sessions.map(
							({ auth_sessions, ...rest }) => rest,
						),
					);
				}

				// dispatching the group
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

				// dispatching the connected session
				dispatch(
					sessionConnectionApi.util.upsertQueryData(
						"getConnectedSessions",
						undefined,
						sessionConnectionAdapter.setAll(
							sessionConnectionAdapter.getInitialState(),
							flatConnectedSessions,
						),
					),
				);

				// dispatching the session
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

				// user dispatch
				dispatch(
					usersApi.util.upsertQueryData(
						"getUsers",
						undefined,
						usersAdapter.setAll(usersAdapter.getInitialState(), users),
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
