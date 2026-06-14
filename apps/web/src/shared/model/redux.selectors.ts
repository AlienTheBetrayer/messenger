import { createSelector } from "@reduxjs/toolkit";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

import {
	RootState,
	RTKEndpointName,
	RTKQueryEntry,
} from "@/shared/model/redux.types";

/**
 * root api state selector
 * @param state root state
 * @returns api
 */
const selectApiState = (state: RootState) => state.api;

/**
 * selector that memoizes and maps all endpoints to their queries and mutations in one record
 * @param index mapped index state
 */
const selectEndpointIndex = createSelector(selectApiState, (api) => {
	const index = new Map<string, RTKQueryEntry[]>();

	for (const entry of [
		...Object.values(api.queries ?? {}),
		...Object.values(api.mutations ?? {}),
	]) {
		if (!entry?.endpointName) continue;
		index.getOrInsert(entry.endpointName, []).push(entry);
	}

	return index;
});

/**
 * selector that memoizes specified endpoints and their status
 * @param endpoints endpoints to watch
 * @param status status to check
 * @returns
 */
export const selectRouteStatus = (
	endpoints: RTKEndpointName[],
	status: QueryStatus,
) => {
	return createSelector<[typeof selectEndpointIndex], boolean>(
		selectEndpointIndex,
		(index) => {
			return endpoints.some((endpoint) => {
				return index.get(endpoint)?.some((x) => x?.status === status);
			});
		},
	);
};

/**
 * determines whether specified endpoints are loading
 * @param endpoints endpoints to watch
 * @returns whether at least any of them are loading
 */
export const useIsLoading = (endpoints: RTKEndpointName[]) => {
	return useSelector(selectRouteStatus(endpoints, QueryStatus.pending));
};
