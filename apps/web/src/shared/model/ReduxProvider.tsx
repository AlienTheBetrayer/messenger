"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore } from "@/shared/model/redux.store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

	if (storeRef.current === null) {
		storeRef.current = makeStore();
	}

	// eslint-disable-next-line react-hooks/refs
	return <Provider store={storeRef.current}>{children}</Provider>;
}
