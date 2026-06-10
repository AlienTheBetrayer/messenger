import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/shared/model/redux.types";

/**
 * typed wrapper around useDispatch, but with correct types
 * @returns typed useDispatch
 */
export const useAppDispatch = () => {
	return useDispatch<AppDispatch>();
};

/**
 * typed wrapper around useSelector, but with correct types
 * @returns typed useSelector
 */
export const useAppSelector = <T>(selector: (state: RootState) => T) => {
	return useSelector(selector);
};
