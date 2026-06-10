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
			invalidatesTags: ["me"],
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
		me: builder.query<AuthMeReturn, AuthMeSchema>({
			query: () => ({
				url: "/auth/me",
				method: "GET",
			}),
			providesTags: ["me"],
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
			onQueryStarted(args, { dispatch }) {
				dispatch(authApi.util.resetApiState());
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
