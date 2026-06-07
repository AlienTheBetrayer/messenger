import { parseAsStringLiteral, useQueryState } from "nuqs";

import { RedirectPopupVariants } from "@/features/auth/lib/variants";

export const useVerifyLiteral = ["idle", "pending", "success"] as const;

const useVerify = () => {
	return useQueryState(
		"verify",
		parseAsStringLiteral(useVerifyLiteral),
	);
};

const useError = () => {
	return useQueryState(
		"error",
		parseAsStringLiteral<keyof typeof RedirectPopupVariants>(
			Object.keys(
				RedirectPopupVariants,
			) as (keyof typeof RedirectPopupVariants)[],
		),
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
