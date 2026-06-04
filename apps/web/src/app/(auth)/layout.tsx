"use client";

import type React from "react";

import { AuthFormProvider } from "@/features";
import { AuthRedirectPopup } from "@/features/auth/ui/other/AuthRedirectPopup";

type Props = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
	return (
		<AuthFormProvider>
			<main className="flex justify-center min-h-screen mt-30">
				{children}

				<AuthRedirectPopup />
			</main>
		</AuthFormProvider>
	);
}
