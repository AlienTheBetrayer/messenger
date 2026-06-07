import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { notificationMiddleware } from "@/features/notifications/model/notification.middleware";
import { notificationSlice } from "@/features/notifications/model/notification.slice";

/**
 * global api slice
 * has to be injected later into
 */
export const baseApi = createApi({
	tagTypes: ["me"],
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: () => ({}),
});

/**
 * global app store
 */
export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[notificationSlice.name]: notificationSlice.reducer,
	},
	middleware: (gDM) =>
		gDM().concat(baseApi.middleware, notificationMiddleware),
});
