import "@/shared/styles/globals.css";

import { AuthMeReturn } from "@gravity/shared";

import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { ThemesProvider } from "@/features/ui";
import { Header } from "@/features/ui/ui/header/Header";
import { ReduxProvider, sfetch, TooltipProvider } from "@/shared";
import { AuthMeReturn__ } from "@/shared/model/serializable.types";

export const metadata = {
	title: "Outwave",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// auth
	let auth: AuthMeReturn__ | null = null;
	try {
		auth = (await (await sfetch("/auth/me")).json()) as AuthMeReturn__;
	} catch {
		/** */
	}

	// jsx
	return (
		<html suppressHydrationWarning>
			<body className="min-h-[144vh] flex flex-col">
				<ReduxProvider auth={auth}>
					<ThemesProvider>
						<TooltipProvider delayDuration={250}>
							<Header />
							<NotificationSonner />

							{children}
						</TooltipProvider>
					</ThemesProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
