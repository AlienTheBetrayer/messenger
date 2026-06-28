import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import { localSlice } from "@/features/ui/model/local.slice";
import { uiSlice } from "@/features/ui/model/ui.slice";

/**
 * persistance reducers
 */
const persistedLocalReducer = persistReducer(
	{
		key: "local",
		storage: localStorage,
	},
	localSlice.reducer,
);

/**
 * global api slice
 * has to be injected later into
 */
export const baseApi = createApi({
	tagTypes: ["me"],
  reducerPath: "api",
  keepUnusedDataFor: 99999999,
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
			[localSlice.name]: persistedLocalReducer,
		},
		preloadedState,
		middleware: (gDM) =>
			gDM({
				serializableCheck: {
					ignoredActions: [
						"persist/PERSIST",
						"persist/REHYDRATE",
						"persist/REGISTER",
					],
				},
			}).concat(baseApi.middleware),
	});

	const persistor = persistStore(store);
	return { store, persistor };
};
