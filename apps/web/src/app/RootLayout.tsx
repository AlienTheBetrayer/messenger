"use client";

import { NuqsAdapter } from "nuqs/adapters/react";
import { Provider } from "react-redux";

import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { ThemesProvider } from "@/features/ui/providers/ThemesProvider";
import { Header } from "@/features/ui/ui/header/Header";
import { store, Watcher } from "@/shared";

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<Provider store={store}>
			<Watcher />
			<ThemesProvider>
				<NuqsAdapter>
					<Header />
					<NotificationSonner />

					{children}
				</NuqsAdapter>
			</ThemesProvider>
		</Provider>
	);
};
