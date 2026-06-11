"use client";

import { useMemo } from "react";

import { authApi } from "@/features/auth/model/auth.slice";
import { serverGetAuth } from "@/features/auth/server/routes";
import { useAppDispatch } from "@/shared";

export const AuthHydrator = ({
	auth,
}: {
	auth: Awaited<ReturnType<typeof serverGetAuth>>;
}) => {
	// states
	const dispatch = useAppDispatch();

	// hydrating
	useMemo(() => {
		if (!auth.status) {
			return;
		}

		dispatch(authApi.util.upsertQueryData("me", undefined, auth.data));
	}, [auth, dispatch]);

	return null;
};
