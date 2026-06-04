import { QueryStatus } from "@reduxjs/toolkit/query";

import { authApi } from "@/features/auth/model/auth.slice";
import { AppStore } from "@/shared/model/redux.store";

/**
 * global app types
 */
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

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
