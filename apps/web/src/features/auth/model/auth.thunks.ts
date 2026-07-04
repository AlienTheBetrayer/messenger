import { PickRequired } from "@gravity/shared";

import { authActions } from "@/features/auth/model/auth.slice";
import { connectionActions } from "@/features/connections/model/connection.slice";
import { sessionActions } from "@/features/connections/model/sessions.slice";
import { userActions } from "@/features/users/model/users.slice";
import { AppDispatch, RootState } from "@/shared/model/redux.types";
import {
	AuthLoginReturn__,
	ConnectionAddReturn__,
	ConnectionAddSchema__,
	ConnectionLoginReturn__,
} from "@/shared/model/serializable.types";

export const hydrateAuth = async (
	dispatch: AppDispatch,
	options: {
		data: Pick<AuthLoginReturn__, "user" | "session">;
	},
) => {
	dispatch(
		authActions.setAuth({
			userId: options.data.user.id,
			sessionId: options.data.session.id,
		}),
	);
	dispatch(userActions.upsertOne(options.data.user));
	dispatch(sessionActions.upsertOne(options.data.session));
};

export const hydrateConnectionAdd = async (
	dispatch: AppDispatch,
	options: {
		state: RootState;
		data: ConnectionAddReturn__;
		args: PickRequired<ConnectionAddSchema__, "connectionId">;
	},
) => {
	// state
	const groupId = options.args.groupId;

	// dispatching
	dispatch(
		connectionActions.upsertOne({
			id: options.args.connectionId,
			group_id: groupId,
			created_at: new Date().toISOString(),
			user_id: options.data.user.id,
		}),
	);
};

export const hydrateConnectionLogin = async (
	dispatch: AppDispatch,
	options: {
		state: RootState;
		data: ConnectionLoginReturn__;
	},
) => {
	hydrateAuth(dispatch, { data: options.data });
};
