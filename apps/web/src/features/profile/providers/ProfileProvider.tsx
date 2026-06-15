"use client";

import { createContext, useContext } from "react";

export type ProfileProviderType = {
	profileForm: unknown;
};

export const ProfileContext = createContext<ProfileProviderType | null>(null);

export const ProfileProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<ProfileContext.Provider value={{ profileForm: null }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfileProvider = () => {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error("useProfileProvider must be used within a ProfileProvider");
	}
	return context;
};
