import { RedirectPopupVariants } from "@/features/auth/lib/variants";
import { useQueryState } from "@/shared/hooks/useQueryState";

const useError = () => {
	return useQueryState(
		"error",
		Object.keys(
			RedirectPopupVariants,
		) as (keyof typeof RedirectPopupVariants)[],
	);
};

const useVerify = () => {
	return useQueryState("verify", ["pending", "success"] as const);
};

const useConnection = () => {
	return useQueryState("connection", ["pending"] as const);
};

const useId = () => {
	return useQueryState("id");
};

/**
 * grouped type-safe hooks (useQueryState from nuqs)
 * @returns hook functions
 */
export const queryStateHooks = {
	useVerify,
	useId,
	useConnection,
	useError,
};
