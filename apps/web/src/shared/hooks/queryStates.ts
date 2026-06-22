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

export const AuthTypes = [
	"verify-pending",
	"verify-success",
] as const;

const useAuthType = () => {
	return useQueryState("type", AuthTypes);
};

/**
 * grouped type-safe hooks (useQueryState from nuqs)
 * @returns hook functions
 */
export const queryStateHooks = {
	useAuthType,
	useError,
};
