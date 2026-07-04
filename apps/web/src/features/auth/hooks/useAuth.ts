"use client";

import { useMeQuery } from "@/features/auth/model/auth.api";
import { sessionSelectors } from "@/features/connections/model/sessions.slice";
import { userSelectors } from "@/features/users/model/users.slice";
import { useAppSelector } from "@/shared/model/redux.hooks";
import {
	auth_sessionsType__,
	usersType__,
} from "@/shared/model/serializable.types";

/**
 * wrapper around useMeQuery(). gets authentication data (instantly hydrated from the server + SSOT)
 * @returns useMeQuery()
 */
export const useAuth = ():
	| { user: usersType__; session: auth_sessionsType__ }
	| undefined => {
	// fetching validation (preloaded)
	useMeQuery();

	// selecting
	const auth = useAppSelector((state) => state.auth);
	const user = useAppSelector(
		(state) =>
			auth.status && userSelectors.selectById(state, auth.status?.userId),
	);
	const session = useAppSelector(
		(state) =>
			auth.status && sessionSelectors.selectById(state, auth.status?.sessionId),
	);

	if (!user || !session) {
		return;
	}

	return { user, session };
};
