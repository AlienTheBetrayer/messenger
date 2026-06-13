/* eslint-disable react-hooks/refs */
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { AppStore } from "@/shared/model/redux.types";

import { createReduxStore } from "./redux.store";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = createReduxStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};
