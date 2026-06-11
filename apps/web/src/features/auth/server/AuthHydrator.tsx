/* eslint-disable react-hooks/refs */
"use client";

import { useRef } from "react";

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

	// refs
	const hasHydrated = useRef<boolean>(false);

	// hydrating
	if (!hasHydrated.current) {
		dispatch(authApi.util.upsertQueryData("me", undefined, auth.data));
		hasHydrated.current = true;
	}

	return null;
};
