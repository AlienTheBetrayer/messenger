import { createSelector } from "@reduxjs/toolkit";

import { connectionSelectors } from "@/features/connections/model/connection.slice";
import { RootState } from "@/shared/model/redux.types";
import { connectionsType__ } from "@/shared/model/serializable.types";

const selectConnectionsByGroupMap = createSelector(
	connectionSelectors.selectAll,
	(connections) => {
		const map: Record<string, connectionsType__[]> = {};

		for (const c of connections) {
			(map[c.group_id] ??= []).push(c);
		}

		return map;
	},
);

export const selectConnectionsForGroup = createSelector(
	selectConnectionsByGroupMap,
	(_: RootState, groupId: string) => groupId,
	(map, groupId) => map[groupId] ?? [],
);

export const selectConnectionIdsForGroup = createSelector(
	selectConnectionsByGroupMap,
	(_: RootState, groupId: string) => groupId,
	(map, groupId) => map[groupId]?.map((c) => c.id) ?? [],
);
