import {
  sessionConnectionAdapter,
  sessionConnectionApi,
} from "@/features/connections/model/sessionConnections.api";
import {
  groupAdapter,
  groupApi,
} from "@/features/connections/model/sessionGroup.api";
import {
  sessionAdapter,
  sessionApi,
} from "@/features/connections/model/sessions.api";
import { uiSlice } from "@/features/ui/model/ui.slice";
import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { baseApi } from "@/shared/model/redux.store";
import {
  AuthCodeReturn__,
  AuthCodeSchema__,
  AuthForgotPasswordReturn__,
  AuthLoginReturn__,
  AuthLogoutReturn__,
  AuthLogoutSchema__,
  AuthMeReturn__,
  AuthMeSchema__,
  AuthSchema__,
  AuthSignupReturn__,
} from "@/shared/model/serializable.types";

/**
 * auth slice (no verification code yet)
 */
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * /auth/code/
		 */
		getCode: builder.mutation<AuthCodeReturn__, AuthCodeSchema__>({
			query: (body) => ({
				url: "/auth/code",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/login
		 */
		login: builder.mutation<AuthLoginReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				// data retrieving
				const { data } = await queryFulfilled;

				// optimistic updates
				switch (args.action) {
					case "connect": {
						const metadata = args.actionMetadata;

						if (!metadata) {
							return;
						}

						const { groupId, connectionId } = metadata;

						// dispatching the updated connection
						dispatch(
							sessionConnectionApi.util.updateQueryData(
								"getConnectedSessions",
								undefined,
								(draft) =>
									sessionConnectionAdapter.addOne(draft, {
										id: connectionId,
										group_id: groupId,
										created_at: new Date().toISOString(),
										session_id: data.session.id,
									}),
							),
						);

						// dispatching the updated ids
						dispatch(
							groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
								groupAdapter.updateOne(draft, {
									id: groupId,
									changes: {
										connectedSessionIds: [
											...(draft.entities[groupId]?.connectedSessionIds ?? {}),
											connectionId,
										],
									},
								});
							}),
						);

						break;
					}
					default: {
						// dispatching the current authenticated user
						dispatch(
							authApi.util.upsertQueryData("me", undefined, {
								userId: data.user.id,
								sessionId: data.session.id,
							}),
						);
						break;
					}
				}

				// dispatching the actual user
				dispatch(
					usersApi.util.updateQueryData("getUsers", undefined, (draft) =>
						usersAdapter.addOne(draft, data.user),
					),
				);

				// dispatching the actual session
				dispatch(
					sessionApi.util.updateQueryData("getSessions", undefined, (draft) => {
						sessionAdapter.addOne(draft, data.session);
					}),
				);
			},
		}),

		/**
		 * /auth/signup
		 */
		signup: builder.mutation<AuthSignupReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/forgot-password
		 */
		forgotPassword: builder.mutation<AuthForgotPasswordReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/me
		 */
		me: builder.query<{ userId?: string; sessionId?: string }, AuthMeSchema__>({
			query: () => ({
				url: "/auth/me",
				method: "GET",
			}),

			transformResponse: (response: AuthMeReturn__) => {
				return { userId: response.user.id, sessionId: response.session.id };
			},
		}),

		/**
		 * /auth/logout
		 */
		logout: builder.mutation<AuthLogoutReturn__, AuthLogoutSchema__>({
			query: () => ({
				url: "/auth/logout",
				method: "DELETE",
			}),

			async onQueryStarted(args, { dispatch }) {
				// optimistic instant update
				dispatch(
					authApi.util.updateQueryData("me", undefined, () => ({
						userId: undefined,
					})),
				);

				dispatch(uiSlice.actions.reset());
			},
		}),
	}),
});

export const {
	useGetCodeMutation,
	useLoginMutation,
	useSignupMutation,
	useForgotPasswordMutation,
	useLogoutMutation,
	useMeQuery,
	useLazyMeQuery,
} = authApi;
