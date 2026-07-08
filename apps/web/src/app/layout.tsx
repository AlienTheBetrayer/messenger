import "@/shared/styles/globals.css";

import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { ThemesProvider } from "@/features/ui";
import { AppMenubar } from "@/features/ui/ui/menubar/AppMenubar";
import { QueryStateModals } from "@/features/ui/ui/QueryStateModals";
import { ReduxProvider, sfetch, TooltipProvider } from "@/shared";
import { AuthMeReturn__ } from "@/shared/model/serializable.types";

export const metadata = {
	title: "Outwave",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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
			<body className="min-h-[144vh] flex flex-col dotted p-2">
				<ReduxProvider auth={auth}>
					<ThemesProvider>
						<TooltipProvider delayDuration={250}>
							<AppMenubar />

							<NotificationSonner />
							<QueryStateModals />

							{children}
              {modal}
						</TooltipProvider>
					</ThemesProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
