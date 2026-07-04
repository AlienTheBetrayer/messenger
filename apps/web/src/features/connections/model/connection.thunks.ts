import { generateId } from "@gravity/shared";

import { normalizeConnections } from "@/features/connections/model/connection.normalizers";
import { connectionActions } from "@/features/connections/model/connection.slice";
import { CreateGroupArgs } from "@/features/connections/model/connections.api";
import { groupActions } from "@/features/connections/model/group.slice";
import { userActions } from "@/features/users/model/users.slice";
import { AppDispatch, RootState } from "@/shared/model/redux.types";
import { ConnectionsReturn__ } from "@/shared/model/serializable.types";

export const hydrateConnections = async (
	dispatch: AppDispatch,
	params: {
		data: ConnectionsReturn__;
	},
) => {
	// normalizing
	const normalized = normalizeConnections(params.data);

	// dispatching
	dispatch(groupActions.setAll(normalized.groups));
	dispatch(connectionActions.setAll(normalized.connections));
	dispatch(userActions.setAll(normalized.users));
};

export const hydrateGroup = async (
	dispatch: AppDispatch,
	params: {
		state: RootState;
		args: CreateGroupArgs;
	},
) => {
	// data
	const auth = params.state.auth;
	const groupId = params.args.groupId ?? generateId();
	const connectionId = params.args.connectionId ?? generateId();
	const userId = auth.status?.userId;

	if (!userId) {
		return;
	}

	// dispatching
	dispatch(
		groupActions.upsertOne({
			...params.args,
			created_at: new Date().toISOString(),
			last_connected_at: new Date().toISOString(),
			owner_user_id: userId,
			id: groupId,
		}),
	);

	dispatch(
		connectionActions.upsertOne({
			id: connectionId,
			group_id: groupId,
			user_id: userId,
			created_at: new Date().toISOString(),
		}),
	);
};
