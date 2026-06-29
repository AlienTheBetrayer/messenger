import { PickRequired } from "@gravity/shared";

import { dispatchLogin } from "@/features/auth/model/auth.lib";
import {
	sessionConnectionAdapter,
	sessionConnectionApi,
} from "@/features/connections/model/sessionConnections.api";
import {
	groupAdapter,
	groupApi,
} from "@/features/connections/model/sessionGroup.api";
import { uiSlice } from "@/features/ui/model/ui.slice";
import { baseApi } from "@/shared/model/redux.store";
import {
	AuthCodeReturn__,
	AuthCodeSchema__,
	AuthForgotPasswordReturn__,
	AuthLoginConnectionReturn__,
	AuthLoginConnectionSchema__,
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

		loginConnection: builder.mutation<
			AuthLoginConnectionReturn__,
			PickRequired<AuthLoginConnectionSchema__, "connectionId">
		>({
			query: (body) => ({
				url: "/auth/login-connection",
				method: "POST",
				body,
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				// data retrieving
        const { data } = await queryFulfilled;
        
        // dispatching session + user data
				dispatchLogin(dispatch, data);

				// dispatching the updated connection
				dispatch(
					sessionConnectionApi.util.updateQueryData(
						"getConnectedSessions",
						undefined,
						(draft) =>
							sessionConnectionAdapter.addOne(draft, {
								id: args.connectionId,
								group_id: args.groupId,
								created_at: new Date().toISOString(),
								session_id: data.session.id,
							}),
					),
				);

				// dispatching the updated ids
				dispatch(
					groupApi.util.updateQueryData("getGroups", undefined, (draft) => {
						groupAdapter.updateOne(draft, {
							id: args.groupId,
							changes: {
								connectedSessionIds: [
									args.connectionId,
									...(draft.entities[args.groupId]?.connectedSessionIds ?? {}),
								],
							},
						});
					}),
				);
			},
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

        // dispatching session + user data
				dispatchLogin(dispatch, data);

				// dispatching the current authenticated user
				dispatch(
					authApi.util.upsertQueryData("me", undefined, {
						userId: data.user.id,
						sessionId: data.session.id,
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
  useLoginConnectionMutation,
	useSignupMutation,
	useForgotPasswordMutation,
	useLogoutMutation,
	useMeQuery,
	useLazyMeQuery,
} = authApi;
