import {
	sessionAdapter,
	sessionApi,
} from "@/features/connections/model/sessions.api";
import { usersAdapter, usersApi } from "@/features/users/model/users.api";
import { AppDispatch } from "@/shared/model/redux.types";
import { AuthLoginReturn__ } from "@/shared/model/serializable.types";

/**
 * optimistic dispatch that updates users and session
 * works for /login and /login-connection
 * @param dispatch dispatch from onQueryStarted
 * @param data data from /login
 */
export const dispatchLogin = (
	dispatch: AppDispatch,
	data: AuthLoginReturn__,
) => {
	// dispatching the actual user
	dispatch(
		usersApi.util.updateQueryData("getUsers", undefined, (draft) =>
			usersAdapter.addOne(draft, data.user),
		),
	);

	// dispatching the actual session
	dispatch(
		sessionApi.util.updateQueryData("getSessions", undefined, (draft) => {
			sessionAdapter.addOne(draft, data.session);
		}),
	);
};
