"use client";

import { verification_codesType } from "@gravity/shared";
import { usePathname } from "next/navigation";
import type React from "react";

import { AuthFormProvider } from "@/features";
import { AuthRedirectPopup } from "@/features/auth/ui/other/AuthRedirectPopup";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// states
	const pathName = usePathname();
	const page = pathName.split("/")[1];

	// jsx
	return (
		<AuthFormProvider
			type={page.replace("-", "_") as verification_codesType["type"]}
		>
			<main className="flex justify-center min-h-screen mt-16">
				{children}

				<AuthRedirectPopup />
			</main>
		</AuthFormProvider>
	);
}
