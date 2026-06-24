"use client";

import { usersType } from "@gravity/shared";

import { useMeQuery } from "@/features/auth/model/auth.api";
import { usersSelectors } from "@/features/users/model/users.api";
import { useAppSelector } from "@/shared";

/**
 * wrapper around useMeQuery(). gets authentication data (instantly hydrated from the server + SSOT)
 * @returns useMeQuery()
 */
export const useAuth = (): { user: usersType } | undefined => {
	const data = useMeQuery();

	const user = useAppSelector((state) =>
		usersSelectors.selectById(state, data.data?.userId ?? ""),
	);

	if (!data.data?.userId) {
		return;
	}

	return { user };
};
