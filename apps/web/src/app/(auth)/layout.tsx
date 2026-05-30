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
			<div className="flex items-center justify-center h-screen">
				{children}

				<AuthRedirectPopup />
			</div>
		</AuthFormProvider>
	);
}
