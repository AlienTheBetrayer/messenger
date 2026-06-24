import "@/shared/styles/globals.css";

import { ApiErrorSchema, AuthMeReturn } from "@gravity/shared";

import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { GlobalProvider } from "@/features/ui/providers/GlobalProvider";
import { Header } from "@/features/ui/ui/header/Header";
import { sfetch } from "@/shared";

export const metadata = {
	title: "Outwave",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// auth
	const auth = (await (await sfetch("/auth/me")).json()) as
		| AuthMeReturn
		| ApiErrorSchema;

	// jsx
	return (
		<html suppressHydrationWarning>
			<body className="min-h-[144vh] flex flex-col">
				<GlobalProvider auth={auth}>
					<Header />
					<NotificationSonner />

					{children}
				</GlobalProvider>
			</body>
		</html>
	);
}
