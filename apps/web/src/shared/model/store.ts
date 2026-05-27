import { baseApi } from "@/shared/model/store.reducer";
import { configureStore } from "@reduxjs/toolkit";

export const AppStore = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
});
