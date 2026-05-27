"use client";

import { AuthFormProvider } from "@/features";
import type React from "react";

type Props = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
	return (
		<AuthFormProvider>
			<div className="flex items-center justify-center h-screen">
				{children}
			</div>
		</AuthFormProvider>
	);
}
