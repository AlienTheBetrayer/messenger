import { createSelector } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/model/auth.api";
import { RootState } from "@/shared";

export const selectAuthMeResult = authApi.endpoints.me.select();
export const selectIsAuthenticated = createSelector(
	[(state: RootState) => selectAuthMeResult(state)],
	(result) => result.data?.userId && result.data.sessionId,
);
