import { RedirectPopupVariants } from "@/features/auth/lib/variants";
import { useQueryState } from "@/shared/hooks/useQueryState";

const useVerify = () => {
	return useQueryState("verify", ["pending", "success"] as const);
};

const useError = () => {
	return useQueryState(
		"error",
		Object.keys(
			RedirectPopupVariants,
		) as (keyof typeof RedirectPopupVariants)[],
	);
};

/**
 * grouped type-safe hooks (useQueryState from nuqs)
 * @returns hook functions
 */
export const queryStateHooks = {
	useVerify,
	useError,
};
