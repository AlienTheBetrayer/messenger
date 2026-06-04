import { parseAsStringLiteral, useQueryState } from "nuqs";

import { RedirectPopupVariants } from "@/features/auth/lib/variants";

const verify = () => {
	return useQueryState(
		"verify",
		parseAsStringLiteral(["pending", "success", "error"] as const),
	);
};

const error = () => {
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
export const useQueryStateHooks = {
	verify,
	error,
};
