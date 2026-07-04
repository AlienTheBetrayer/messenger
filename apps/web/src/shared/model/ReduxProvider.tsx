/* eslint-disable react-hooks/refs */
"use client";

import { AuthMeReturn } from "@gravity/shared";
import { Store } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";

import { normalizeAuthData } from "@/shared/model/redux.normalizers";
import { createReduxStore } from "@/shared/model/redux.store";
import { AuthMeReturn__ } from "@/shared/model/serializable.types";

export const ReduxProvider = ({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: AuthMeReturn__ | null;
}) => {
	const storeRef = useRef<Store | null>(null);

	if (!storeRef.current) {
    let preloadedState: Record<string, unknown> = {};

    if (auth && "user" in auth ) {
      // normalization / init / hydration
			const normalized = normalizeAuthData(auth);

      preloadedState = normalized
		}

		const { store } = createReduxStore(preloadedState);
		storeRef.current = store;
  }
  
	return <Provider store={storeRef.current}>{children}</Provider>;
};
