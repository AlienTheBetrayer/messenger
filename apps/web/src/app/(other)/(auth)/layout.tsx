import type React from "react";

import { CardWrapper } from "@/shared/ui/custom/CardWrapper";

export const metadata = {
	title: "Authentication",
};

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex justify-center items-center w-full max-w-lg mx-auto">
			<CardWrapper
				title="Authentication"
				description="Create the account, sign in, link via additional services, and more."
			>
				{children}
			</CardWrapper>
		</main>
	);
}
