import "@/shared/styles/globals.css";

import { NotificationSonner } from "@/features/notifications/ui/NotificationSonner";
import { GlobalProvider } from "@/features/ui/providers/GlobalProvider";
import { Header } from "@/features/ui/ui/header/Header";

export const metadata = {
	title: "Outwave",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning>
			<body className="min-h-[144vh] flex flex-col">
        <GlobalProvider>
					<Header />
					<NotificationSonner />

					{children}
				</GlobalProvider>
			</body>
		</html>
	);
}
