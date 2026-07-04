import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import { authSlice } from "@/features/auth/model/auth.slice";
import { connectionSlice } from "@/features/connections/model/connection.slice";
import { groupSlice } from "@/features/connections/model/group.slice";
import { sessionSlice } from "@/features/connections/model/sessions.slice";
import { localSlice } from "@/features/ui/model/local.slice";
import { uiSlice } from "@/features/ui/model/ui.slice";
import { userSlice } from "@/features/users/model/users.slice";

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
  reducerPath: "api",
  tagTypes: ["getConnections"],
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
			[connectionSlice.name]: connectionSlice.reducer,
      [groupSlice.name]: groupSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [userSlice.name]: userSlice.reducer,
			[sessionSlice.name]: sessionSlice.reducer,
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
