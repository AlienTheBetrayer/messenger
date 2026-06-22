import type React from "react";

import { AuthSessionAddPopup } from "@/features/auth/ui/other/AuthSessionAddPopup";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="relative min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6 overflow-hidden antialiased transition-colors duration-300">
			<div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-muted/50 via-muted/10 to-transparent pointer-events-none select-none" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))/0.15_1px,transparent_1px)] bg-[size:32px_100%] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_75%)] pointer-events-none select-none" />
			<div className="absolute inset-x-0 top-[15vh] h-px bg-gradient-to-r from-transparent via-border/30 to-transparent pointer-events-none" />
			<div className="relative z-10 w-full flex items-center justify-center animate-in fade-in zoom-in-99 duration-300 ease-out">
				{children}
			</div>

			<AuthSessionAddPopup />
		</main>
	);
}
