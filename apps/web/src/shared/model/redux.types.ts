import { AppStore } from "@/shared/model/redux.store";

/**
 * global app types
 */
export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

/**
 * type for RTK queries
 */
type RTKQueryEntry = {
	status?: "pending" | "fulfilled" | "rejected" | "uninitialized";
	endpointName?: string;
};
