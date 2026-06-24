"use client";

import { AuthMeReturn } from "@gravity/shared";
import { createContext, useContext } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * type
 */
export type HeaderProviderType = {
	auth: AuthMeReturn | undefined;
};

/**
 * context
 */
export const HeaderContext = createContext<HeaderProviderType | null>(null);

/**
 * provider
 * @param children children
 * @returns children wrapped in provider
 */
export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
	// data
  const auth = useAuth();

	// jsx
	return (
		<HeaderContext.Provider value={{ auth }}>
			{children}
		</HeaderContext.Provider>
	);
};

/**
 * context
 * @returns context if used correctly. throws otherwise
 */
export const useHeaderProvider = () => {
	const ctx = useContext(HeaderContext);

	if (!ctx) {
		throw new Error("useHeaderProvider must be used within a HeaderProvider");
	}

	return ctx;
};
