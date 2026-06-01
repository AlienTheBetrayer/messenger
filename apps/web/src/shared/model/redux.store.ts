import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * global api slice
 * has to be injected later into
 */
export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: () => ({
  }),
});

/**
 * global app store
 */
export const AppStore = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
});