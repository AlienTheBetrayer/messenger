"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { uiSlice } from "@/features/ui/model/ui.slice";
import { useAppDispatch } from "@/shared/model/redux.hooks";

export const ReduxWatcher = () => {
	// router
	const pathname = usePathname();

	// redux
	const dispatch = useAppDispatch();

  useEffect(() => {
		dispatch(uiSlice.actions.addInterceptionRoute(pathname));
	}, [pathname, dispatch]);

	return null;
};
