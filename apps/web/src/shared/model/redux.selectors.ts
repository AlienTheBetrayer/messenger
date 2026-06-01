import { QueryStatus } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

import { RootState } from "@/shared/model/redux.types";

/**
 * selects whether a route is in state
 * @param route api route to watch
 * @param status type of status
 * @returns whether it's in the specified state right now
 */
export const selectRouteStatus =
	(route: string, status: QueryStatus) => (state: RootState) => {
		const all = [
			...Object.values(state.api.queries),
			...Object.values(state.api.mutations),
		];

		return all.some((x) => {
			return x?.status === status && x.endpointName === route;
		});
	};

/**
 * selects whether a route is in state (hook-form)
 * @param route api route to watch
 * @param status type of status
 * @returns whether it's in the specified state right now
 */
export const useSelectRouteStatus = (route: string, status: QueryStatus) => {
	return useSelector(selectRouteStatus(route, status));
};

/**
 * selects whether a route is currently loading (hook-form)
 * @param route api route to watch
 * @returns whether it's loading right now
 */
export const useIsLoading = (route: string) => {
	return useSelector(selectRouteStatus(route, QueryStatus.pending));
};
