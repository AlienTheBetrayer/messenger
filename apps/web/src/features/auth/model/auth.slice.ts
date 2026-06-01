import {
	auth_sessionType,
	AuthSchema,
	CodeSchema,
	verification_codesType,
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
		getCode: builder.mutation<verification_codesType, CodeSchema>({
			query: (body) => ({
				url: "/auth/code",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/login
		 */
		login: builder.mutation<
			{
				accessToken: string;
				refreshToken: string;
				session: auth_sessionType;
			},
			AuthSchema
		>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/signup
		 */
		signup: builder.mutation<auth_sessionType, AuthSchema>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),

		/**
		 * /auth/forgot-password
		 */
		forgotPassword: builder.mutation<auth_sessionType, AuthSchema>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useGetCodeMutation,
	useLoginMutation,
	useSignupMutation,
	useForgotPasswordMutation,
} = authApi;
