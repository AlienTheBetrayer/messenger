import {
	AuthCodeReturn,
	AuthCodeSchema,
	AuthForgotPasswordReturn,
	AuthLoginReturn,
	AuthLogoutReturn,
	AuthLogoutSchema,
	AuthMeReturn,
	AuthMeSchema,
	AuthSchema,
	AuthSignupReturn,
} from "@gravity/shared";

import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { baseApi } from "@/shared";

/**
 * auth slice (no verification code yet)
 */
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * /auth/code/
		 */
		getCode: builder.mutation<AuthCodeReturn, AuthCodeSchema>({
			query: (body) => ({
				url: "/auth/code",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/login
		 */
		login: builder.mutation<AuthLoginReturn, AuthSchema>({
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
		signup: builder.mutation<AuthSignupReturn, AuthSchema>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/forgot-password
		 */
		forgotPassword: builder.mutation<AuthForgotPasswordReturn, AuthSchema>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/me
		 */
		me: builder.query<{ userId?: string }, AuthMeSchema>({
			query: () => ({
				url: "/auth/me",
				method: "GET",
			}),

			transformResponse: (response: AuthMeReturn) => {
				return { userId: response.user.id };
			},

			keepUnusedDataFor: 99999999,
		}),

		/**
		 * /auth/logout
		 */
		logout: builder.mutation<AuthLogoutReturn, AuthLogoutSchema>({
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
