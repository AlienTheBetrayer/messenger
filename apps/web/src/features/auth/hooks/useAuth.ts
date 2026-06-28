"use client";

import { useMeQuery } from "@/features/auth/model/auth.api";
import { sessionSelectors } from "@/features/connections/model/sessions.api";
import { usersSelectors } from "@/features/users";
import { useAppSelector } from "@/shared";
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
	// fetching (preloaded)
	const data = useMeQuery();

	// selecting
	const user = useAppSelector((state) =>
		usersSelectors.selectById(state, data.data?.userId ?? ""),
	);
	const session = useAppSelector((state) =>
		sessionSelectors.selectById(state, data.data?.sessionId ?? ""),
	);

	if (!data.data?.userId) {
		return;
	}

	return { user, session };

	return;
};
