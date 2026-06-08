"use client";

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
				<Header />
				<NotificationSonner />

				{children}
			</ThemesProvider>
		</Provider>
	);
};
