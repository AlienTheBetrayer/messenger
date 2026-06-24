import { RedirectPopupVariants } from "@/features/auth";
import { useQueryState } from "@/shared/hooks/useQueryState";

const useError = () => {
	return useQueryState("error", Object.keys(RedirectPopupVariants));
};

const useVerify = () => {
	return useQueryState("verify", ["pending", "success"] as const);
};

/**
 * grouped type-safe hooks (useQueryState from nuqs)
 * @returns hook functions
 */
export const queryStateHooks = {
	useVerify,
	useError,
};
