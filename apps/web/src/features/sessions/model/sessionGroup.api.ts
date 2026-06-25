import {
	auth_sessionsType,
	connected_sessions_groupType,
	connected_sessionsType,
	generateId,
	GroupCreateReturn,
	GroupCreateSchema,
	PickRequired,
	SessionsReturn,
	usersType,
} from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/model/auth.api";
import {
	sessionConnectionAdapter,
	sessionConnectionApi,
} from "@/features/sessions/model/sessionConnections.api";
import {
	sessionAdapter,
	sessionApi,
} from "@/features/sessions/model/sessions.api";
import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { baseApi, RootState } from "@/shared";

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
		/**
		 * gets all the groups, connected sessions, sessions, and normalizes all of it.
		 */
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
				const flatSessions: auth_sessionsType[] = [];
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

		/**
		 * @param id optional id (required for optimistic updates)
		 * @param title required title
		 * @param emoji optional emoji
		 * @returns created group
		 */
		createGroup: build.mutation<
			GroupCreateReturn,
			PickRequired<GroupCreateSchema, "groupId" | "connectionId">
		>({
			query: (body) => ({
				url: "/sessions/group/add",
				method: "POST",
				body,
			}),

			// eslint-disable-next-line @typescript-eslint/unbound-method
			onQueryStarted: async (args, { dispatch, getState }) => {
				const authSelection =
					authApi.endpoints.me.select(undefined)(getState());

				// ids
				const groupId = args.groupId ?? generateId();
				const connectionId = args.connectionId ?? generateId();
				const sessionId = authSelection.data?.sessionId;

				if (!sessionId) {
					return;
				}

				// dispatching the created group
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.addOne(draft, {
							...args,
							created_at: new Date().toISOString() as unknown as Date,
							id: groupId,
							connectedSessionIds: [connectionId],
						});
					}),
				);

				// dispatching the connection (connected to the group above)
				dispatch(
					sessionConnectionApi.util.updateQueryData(
						"getConnectedSessions",
						undefined,
						(draft) => {
							sessionConnectionAdapter.addOne(draft, {
								id: connectionId,
								group_id: groupId,
								session_id: sessionId,
								created_at: new Date().toISOString() as unknown as Date,
							});
						},
					),
				);
			},
		}),
	}),
});

export const { useGetGroupsQuery, useCreateGroupMutation } = groupApi;

/**
 * selectors
 */
const selectGetGroupsResult = groupApi.endpoints.getGroups.select();
const selectGroupsData = (state: RootState) =>
	selectGetGroupsResult(state).data ?? initialState;

export const groupSelectors = groupAdapter.getSelectors(selectGroupsData);
