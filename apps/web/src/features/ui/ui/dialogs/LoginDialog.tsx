"use client";

import { AuthPage } from "@/features/auth/ui/AuthPage";
import { useFragment } from "@/shared/hooks/useFragment";
import { DialogWrapper } from "@/shared/ui";

export const LoginDialog = () => {
	// fragment
	const fragment = useFragment();

	// jsx
	return (
		<DialogWrapper
			open={fragment.startsWith("login")}
			onOpenChange={() => {
				fragment.toggle("login");
			}}
			title="Authentication"
			description="Log in to your account. Secure."
			className="flex flex-col w-screen! sm:max-w-lg max-w-lg"
			content={<AuthPage type="login" />}
		/>
	);
};
