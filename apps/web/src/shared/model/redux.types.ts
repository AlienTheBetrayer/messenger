import { QueryStatus } from "@reduxjs/toolkit/query";

import { authApi } from "@/features/auth/model/auth.api";
import { connectionsApi } from "@/features/connections/model/connections.api";
import { notificationsApi } from "@/features/notifications/model/notifications.slice";
import { usersApi } from "@/features/users/model/users.api";
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
	| keyof typeof connectionsApi.endpoints
	| keyof typeof usersApi.endpoints
	| keyof typeof notificationsApi.endpoints;
