import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { baseApi } from "@/shared";
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
				const { data } = await queryFulfilled;

				// dispatching the user id
				dispatch(
					authApi.util.upsertQueryData("me", undefined, {
						userId: data.user.id,
					}),
				);

				// dispatching the actual user
				dispatch(
					usersApi.util.upsertQueryData(
						"getUsers",
						undefined,
						usersAdapter.setOne(usersAdapter.getInitialState(), data.user),
					),
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

			keepUnusedDataFor: 99999999,
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
