import { AuthMeReturn } from "@gravity/shared";
import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { authApi } from "@/features/auth/model/auth.api";
import { uiSlice } from "@/features/ui/model/ui.slice";

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
export const createReduxStore = (preloadedState?: unknown) => {
	const store = configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			[uiSlice.name]: uiSlice.reducer,
    },
    preloadedState,
		middleware: (gDM) => gDM().concat(baseApi.middleware),
	});

	return store;
};
