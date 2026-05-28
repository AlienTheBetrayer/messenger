import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/model/store.reducer";

export const AppStore = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
});
