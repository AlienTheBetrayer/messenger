"use client";

import { useTheme } from "next-themes";
import { ToasterProps } from "sonner";

import { Spinner, Toaster } from "@/shared";

export const NotificationSonner = () => {
	// theme
	const theme = useTheme();

	// jsx
	return (
		<Toaster
			theme={theme.resolvedTheme as ToasterProps["theme"]}
			expand={false}
			visibleToasts={3}
			position="top-center"
			closeButton
			duration={8}
			icons={{
				loading: <Spinner />,
			}}
		/>
	);
};
