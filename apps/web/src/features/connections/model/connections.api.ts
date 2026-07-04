/* eslint-disable @typescript-eslint/unbound-method */
import {
	GroupCreateReturn,
	GroupCreateSchema,
	GroupDeleteReturn,
	GroupDeleteSchema,
	GroupEditReturn,
	GroupEditSchema,
	PickRequired,
} from "@gravity/shared";

import {
	hydrateConnectionAdd,
	hydrateConnectionLogin,
} from "@/features/auth/model/auth.thunks";
import { connectionActions } from "@/features/connections/model/connection.slice";
import {
	hydrateConnections,
	hydrateGroup,
} from "@/features/connections/model/connection.thunks";
import { groupActions } from "@/features/connections/model/group.slice";
import { baseApi } from "@/shared/model/redux.store";
import {
	ConnectionAddReturn__,
	ConnectionAddSchema__,
	ConnectionCodeReturn__,
	ConnectionCodeSchema__,
	ConnectionDeleteReturn__,
	ConnectionDeleteSchema__,
	ConnectionLoginReturn__,
	ConnectionLoginSchema__,
	ConnectionsReturn__,
} from "@/shared/model/serializable.types";

export type CreateGroupArgs = PickRequired<
	GroupCreateSchema,
	"groupId" | "connectionId"
>;

export const connectionsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		/**
		 * connections
		 */

		getConnections: build.query<ConnectionsReturn__, void>({
			query: () => "/connections",

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				hydrateConnections(dispatch, { data: (await queryFulfilled).data });
			},

			providesTags: ["getConnections"],
		}),

		getConnectionCode: build.mutation<
			ConnectionCodeReturn__,
			ConnectionCodeSchema__
		>({
			query: (body) => ({
				url: "/connections/connection/code",
				method: "POST",
				body,
			}),
		}),

		loginConnection: build.mutation<
			ConnectionLoginReturn__,
			ConnectionLoginSchema__
		>({
			query: (body) => ({
				url: "/connections/connection/login",
				method: "POST",
				body,
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
				const { data } = await queryFulfilled;

				hydrateConnectionLogin(dispatch, {
					state: getState() as never,
					data,
				});

				dispatch(connectionsApi.util.invalidateTags(["getConnections"]));
			},
		}),

		addConnection: build.mutation<
			ConnectionAddReturn__,
			PickRequired<ConnectionAddSchema__, "connectionId">
		>({
			query: (body) => ({
				url: "/connections/connection/add",
				method: "POST",
				body,
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
				hydrateConnectionAdd(dispatch, {
					state: getState() as never,
					data: (await queryFulfilled).data,
					args,
				});
			},
		}),

		deleteConnection: build.mutation<
			ConnectionDeleteReturn__,
			ConnectionDeleteSchema__
		>({
			query: (body) => ({
				url: "/connections/connection/delete",
				method: "DELETE",
				body,
			}),

			async onQueryStarted(args, { dispatch }) {
				dispatch(connectionActions.removeOne(args.connectionId));
			},
		}),

		/**
		 * group
		 */

		createGroup: build.mutation<GroupCreateReturn, CreateGroupArgs>({
			query: (body) => ({
				url: "/connections/group/add",
				method: "POST",
				body,
			}),

			onQueryStarted: async (args, { dispatch, getState }) => {
				hydrateGroup(dispatch, { state: getState() as never, args });
			},
		}),

		editGroup: build.mutation<GroupEditReturn, GroupEditSchema>({
			query: (body) => ({
				url: "/connections/group/edit",
				method: "PATCH",
				body,
			}),

			onQueryStarted: async (args, { dispatch, getState }) => {
				dispatch(groupActions.updateOne({ id: args.groupId, changes: args }));
			},
		}),

		deleteGroup: build.mutation<GroupDeleteReturn, GroupDeleteSchema>({
			query: (body) => ({
				url: "/connections/group/delete",
				method: "DELETE",
				body,
			}),

			async onQueryStarted(args, { dispatch }) {
				dispatch(groupActions.removeOne(args.groupId));
			},
		}),
	}),
});

export const {
	useGetConnectionsQuery,
	useLoginConnectionMutation,
	useGetConnectionCodeMutation,
	useAddConnectionMutation,
	useCreateGroupMutation,
	useEditGroupMutation,
	useDeleteGroupMutation,
	useDeleteConnectionMutation,
} = connectionsApi;
