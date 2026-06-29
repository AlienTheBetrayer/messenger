/* eslint-disable react-hooks/refs */
"use client";

import { ApiErrorSchema, AuthMeReturn } from "@gravity/shared";
import { Store } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";

import { normalizeAuthData } from "@/shared/model/redux.normalizers";
import { createReduxStore } from "@/shared/model/redux.store";

export const ReduxProvider = ({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: AuthMeReturn | null;
}) => {
	const storeRef = useRef<Store | null>(null);

	if (!storeRef.current) {
		let preloadedState: Record<string, unknown> = {};

		if (auth) {
			const { normalizedUsers } = normalizeAuthData(auth);

			preloadedState = {
				api: {
					queries: {
						"getUsers(undefined)": {
							status: "fulfilled",
							endpointName: "getUsers",
							data: normalizedUsers,
							fulfilledTimeStamp: 0,
						},
						"me(undefined)": {
							status: "fulfilled",
							endpointName: "me",
							data: { userId: auth.user.id },
							fulfilledTimeStamp: 0,
						},
					},
				},
			};
		}

		const { store } = createReduxStore(preloadedState);
		storeRef.current = store;
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};
