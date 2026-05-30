import { FullAuthRequestSchema, PrismaTypes } from "@gravity/shared";

import { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { baseApi } from "@/shared";

/**
 * auth slice (no verification code yet)
 */
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		authVerify: builder.mutation<
			PrismaTypes["verification_codes"],
			FullAuthRequestSchema & { type: AuthFormVariantsType }
		>({
			query: (body) => ({
				url: `/auth/${body.type}`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useAuthVerifyMutation } = authApi;
