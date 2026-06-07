import { QueryStatus } from "@reduxjs/toolkit/query";

import { authApi } from "@/features/auth/model/auth.slice";
import { store } from "@/shared/model/redux.store";

/**
 * global app types
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * type for RTK queries
 */
export type RTKQueryEntry = {
	status?: QueryStatus;
	endpointName?: string;
};

/**
 * type for RTK endpoints
 */
export type RTKEndpointName = keyof typeof authApi.endpoints;
