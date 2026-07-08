import "@/shared/styles/globals.css";

import { GlobalProvider } from "@/features/ui/providers/GlobalProvider";
import { AppMenubar } from "@/features/ui/ui/menubar/AppMenubar";
import { sfetch } from "@/shared";
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
			<body className="flex flex-col h-screen w-screen dotted">
				<GlobalProvider auth={auth}>
					<AppMenubar />

					<div className="relative flex w-full h-full p-2">
						{children}
						{modal}
					</div>
				</GlobalProvider>
			</body>
		</html>
	);
}
