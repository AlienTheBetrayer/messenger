/* eslint-disable @typescript-eslint/unbound-method */
import {
	connected_sessions_groupType,
	generateId,
	GroupCreateReturn,
	GroupCreateSchema,
	GroupDeleteReturn,
	GroupDeleteSchema,
	GroupEditReturn,
	GroupEditSchema,
	PickRequired,
} from "@gravity/shared";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/model/auth.api";
import {
	sessionConnectionAdapter,
	sessionConnectionApi,
} from "@/features/connections/model/sessionConnections.api";
import {
	sessionAdapter,
	sessionApi,
} from "@/features/connections/model/sessions.api";
import { usersAdapter, usersApi } from "@/features/users";
import { baseApi } from "@/shared/model/redux.store";
import { RootState } from "@/shared/model/redux.types";
import {
	auth_sessionsType__,
	connected_sessionsType__,
	ConnectedSessionGroup__,
	ConnectionsReturn__,
	usersType__,
} from "@/shared/model/serializable.types";

export type ConnectedSessionGroup = connected_sessions_groupType & {
	connectedSessionIds: string[];
};

/**
 * adapter
 */
export const groupAdapter = createEntityAdapter<ConnectedSessionGroup__>({
	sortComparer: (a, b) => {
		// last connection
		if (a.last_connected_at !== b.last_connected_at) {
			if (!a.last_connected_at) return 1;
			if (!b.last_connected_at) return -1;

			return b.last_connected_at.localeCompare(a.last_connected_at);
		}

		// edit
		if (a.edited_at !== b.edited_at) {
			if (!a.edited_at) return 1;
			if (!b.edited_at) return -1;

			return b.edited_at.localeCompare(a.edited_at);
		}

		// creation
		if (a.created_at !== b.created_at) {
			return b.created_at.localeCompare(a.created_at);
		}

		// fallback
		return a.id.localeCompare(b.id);
	},
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
		getGroups: build.query<EntityState<ConnectedSessionGroup__, string>, void>({
			query: () => ({
				url: "/connections",
				method: "GET",
			}),

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled;
				const data = res.data as unknown as ConnectionsReturn__;

				if (!("connections" in data)) {
					return;
				}

				// normalizing
				const normalizedGroups: ConnectedSessionGroup__[] = [];
				const flatConnectedSessions: connected_sessionsType__[] = [];
				const flatSessions: auth_sessionsType__[] = [];
				const users: usersType__[] = [];

				for (const group of data.connections) {
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
		 * edits a group with an optimistic update
		 * @param groupId required id of the group
		 * @param title optional title
		 * @param emoji optional emoji
		 * @returns edited group
		 */
		editGroup: build.mutation<GroupEditReturn, GroupEditSchema>({
			query: (body) => ({
				url: "/connections/group/edit",
				method: "PATCH",
				body,
			}),

			onQueryStarted: async (args, { dispatch, getState }) => {
				// dispatching the group updates
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.updateOne(draft, { id: args.groupId, changes: args });
					}),
				);
			},
		}),

		/**
		 * creates a new group with an optimistic update
		 * @param connectionId required id of the connection
		 * @param groupId required id of the group
		 * @param title required title
		 * @param emoji optional emoji
		 * @returns created group
		 */
		createGroup: build.mutation<
			GroupCreateReturn,
			PickRequired<GroupCreateSchema, "groupId" | "connectionId">
		>({
			query: (body) => ({
				url: "/connections/group/add",
				method: "POST",
				body,
			}),

			onQueryStarted: async (args, { dispatch, getState }) => {
				const authSelection =
					authApi.endpoints.me.select(undefined)(getState());

				// ids
				const groupId = args.groupId ?? generateId();
				const connectionId = args.connectionId ?? generateId();
				const sessionId = authSelection.data?.sessionId;
				const userId = authSelection.data?.userId;

				if (!sessionId || !userId) {
					return;
				}

				// dispatching the created group
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.addOne(draft, {
							...args,
							created_at: new Date().toISOString(),
							last_connected_at: new Date().toISOString(),
							owner_user_id: userId,
							connectedSessionIds: [connectionId],
							id: groupId,
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
								created_at: new Date().toISOString(),
							});
						},
					),
				);
			},
		}),

		/**
		 * deletes a group with an optimistic update
		 * @param groupId required id of the group
		 * @returns deleted group
		 */
		deleteGroup: build.mutation<GroupDeleteReturn, GroupDeleteSchema>({
			query: (body) => ({
				url: "/connections/group/delete",
				method: "DELETE",
				body,
			}),

			async onQueryStarted(args, { dispatch }) {
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.removeOne(draft, args.groupId);
					}),
				);
			},
		}),
	}),
});

export const {
	useGetGroupsQuery,
	useCreateGroupMutation,
	useEditGroupMutation,
	useDeleteGroupMutation,
} = groupApi;

/**
 * selectors
 */
export const selectGetGroupsResult = groupApi.endpoints.getGroups.select();
export const selectGroupsData = (state: RootState) =>
	selectGetGroupsResult(state).data ?? initialState;

export const groupSelectors = groupAdapter.getSelectors(selectGroupsData);
