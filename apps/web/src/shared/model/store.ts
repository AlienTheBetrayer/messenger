import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/model/store.reducer.js';

export const AppStore = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
});
