/* eslint-disable react-hooks/refs */
"use client";

import { AuthMeReturn, AuthMeSchema } from "@gravity/shared";
import { useRef } from "react";

import { authApi } from "@/features/auth/model/auth.slice";
import { useAppDispatch } from "@/shared";

export const AuthHydrator = ({ auth }: { auth: AuthMeReturn }) => {
	// states
	const dispatch = useAppDispatch();

	// refs
	const hasHydrated = useRef<boolean>(false);

	// hydrating
	if (!hasHydrated.current) {
    dispatch(authApi.util.upsertQueryData("me", undefined, auth));
		hasHydrated.current = true;
	}

	return null;
};
