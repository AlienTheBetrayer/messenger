"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { Fragment, SetHashValue } from "@/shared/lib/fragment";

/**
 * util functions
 */
const subscribe = (callback: () => void) => {
	window.addEventListener("hashchange", callback);

	return () => {
		window.removeEventListener("hashchange", callback);
	};
};

const getSnapshot = () => {
	return window.location.hash.slice(1);
};

/**
 * changes the hash of your page (example: #auth/login/...)
 * @returns class to interact with hash
 */
export const useFragment = () => {
	// state
	const hash = useSyncExternalStore(subscribe, getSnapshot, () => "");

	// functions
	const setHash = useCallback((value: SetHashValue) => {
		const current = getSnapshot();
		const next = typeof value === "function" ? value(current) : value;
		const nextHash = Array.isArray(next) ? next.join("/") : next;

		const url =
			window.location.pathname +
			window.location.search +
			(nextHash ? `#${nextHash}` : "");

		history.pushState(history.state, "", url);

		window.dispatchEvent(new HashChangeEvent("hashchange"));
	}, []);

	const getHash = useCallback(() => {
		return hash;
	}, [hash]);

	const fragment = useMemo(
		() => new Fragment(setHash, getHash),
		[setHash, getHash],
	);

	return fragment;
};
