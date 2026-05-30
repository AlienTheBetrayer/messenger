import { QueryStatus } from "@reduxjs/toolkit/query";

import { RootState } from "@/shared/model/redux.types";

/**
 * selects whether a route is loading
 * @param route api route to watch
 * @returns whether it's loading right now
 */
export const selectRouteStatus = (route: string) => (state: RootState) => {
	const all = [
		...Object.values(state.api.queries),
		...Object.values(state.api.mutations),
	];

	return all.some((x) => {
		return x?.status === QueryStatus.pending && x.endpointName === route;
	});
};
