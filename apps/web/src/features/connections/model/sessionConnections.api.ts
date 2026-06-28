/* eslint-disable @typescript-eslint/unbound-method */
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";

import {
	groupAdapter,
	groupApi,
} from "@/features/connections/model/sessionGroup.api";
import { baseApi, RootState } from "@/shared";
import {
	connected_sessionsType__,
	ConnectionDeleteReturn__,
	ConnectionsDeleteSchema__,
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

		/**
		 * deletes the connection
		 * @param connectionId id of the connection
		 * @returns deleted connection
		 */
		deleteConnection: build.mutation<
			ConnectionDeleteReturn__,
			ConnectionsDeleteSchema__
		>({
			query: (body) => ({
				url: "/connections",
				method: "DELETE",
				body,
			}),

			async onQueryStarted(args, { dispatch, getState }) {
				// group id selection
				const connectionsData =
					sessionConnectionApi.endpoints.getConnectedSessions.select(undefined)(
						getState(),
					);
				const connection = connectionsData.data?.entities[args.connectionId];

				if (!connection) {
					return;
				}

				// dispatching the deleted connection
				dispatch(
					sessionConnectionApi.util.updateQueryData(
						"getConnectedSessions",
						undefined,
						(draft) => {
							sessionConnectionAdapter.removeOne(draft, args.connectionId);
						},
					),
				);

				// dispatching the deleted id
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.updateOne(draft, {
							id: connection.group_id,
							changes: {
								connectedSessionIds: draft.entities[
									connection.group_id
								].connectedSessionIds.filter((id) => id !== args.connectionId),
							},
						});
					}),
				);
			},
		}),
	}),
});

export const { useGetConnectedSessionsQuery, useDeleteConnectionMutation } =
	sessionConnectionApi;

/**
 * selectors
 */
const selectGetConnectedSessionsResult =
	sessionConnectionApi.endpoints.getConnectedSessions.select();
const selectConnectedSessionsData = (state: RootState) =>
	selectGetConnectedSessionsResult(state).data ?? initialState;

export const sessionConnectionsSelectors =
	sessionConnectionAdapter.getSelectors(selectConnectedSessionsData);
