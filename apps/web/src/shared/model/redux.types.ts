import { QueryStatus } from "@reduxjs/toolkit/query";

import { authApi } from "@/features/auth/model/auth.api";
import { sessionConnectionApi } from "@/features/sessions/model/sessionConnections.api";
import { groupApi } from "@/features/sessions/model/sessionGroup.api";
import { sessionApi } from "@/features/sessions/model/sessions.api";
import { usersApi } from "@/features/users";
import { createReduxStore } from "@/shared/model/redux.store";

/**
 * global app types
 */
export type AppStore = ReturnType<typeof createReduxStore>["store"];
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
export type RTKEndpointName =
	| keyof typeof authApi.endpoints
	| keyof typeof sessionApi.endpoints
	| keyof typeof sessionConnectionApi.endpoints
	| keyof typeof groupApi.endpoints
	| keyof typeof usersApi.endpoints;
