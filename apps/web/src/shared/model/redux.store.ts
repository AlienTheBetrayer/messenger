import { configureStore } from "@reduxjs/toolkit";
import {
	createApi,
	fetchBaseQuery,
	setupListeners,
} from "@reduxjs/toolkit/query/react";

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
export const makeStore = () => {
	const store = configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			[notificationSlice.name]: notificationSlice.reducer,
		},
		middleware: (gDM) => gDM().concat(baseApi.middleware),
	});
	setupListeners(store.dispatch);
	return store;
};

export type AppStore = ReturnType<typeof makeStore>;
