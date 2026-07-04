import { authActions } from "@/features/auth/model/auth.slice";
import { hydrateAuth } from "@/features/auth/model/auth.thunks";
import { uiSlice } from "@/features/ui/model/ui.slice";
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
		getCode: builder.mutation<AuthCodeReturn__, AuthCodeSchema__>({
			query: (body) => ({
				url: "/auth/code",
				method: "POST",
				body,
			}),
		}),

		login: builder.mutation<AuthLoginReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				hydrateAuth(dispatch, { data: (await queryFulfilled).data });
			},
		}),

		signup: builder.mutation<AuthSignupReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),

		forgotPassword: builder.mutation<AuthForgotPasswordReturn__, AuthSchema__>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),

		me: builder.query<AuthMeReturn__, AuthMeSchema__>({
			query: () => ({
				url: "/auth/me",
				method: "GET",
			}),

			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					hydrateAuth(dispatch, { data: (await queryFulfilled).data });
				} catch {
					dispatch(authActions.setAuth(null));
				}
			},
		}),

		logout: builder.mutation<AuthLogoutReturn__, AuthLogoutSchema__>({
			query: () => ({
				url: "/auth/logout",
				method: "DELETE",
			}),

			async onQueryStarted(args, { dispatch }) {
				dispatch(authActions.setAuth(null));
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
