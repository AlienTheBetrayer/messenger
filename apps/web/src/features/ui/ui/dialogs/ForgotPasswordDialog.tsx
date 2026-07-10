"use client";

import { AuthPage } from "@/features/auth/ui/AuthPage";
import { useFragment } from "@/shared/hooks/useFragment";
import { DialogWrapper } from "@/shared/ui";

export const ForgotPasswordDialog = () => {
	// fragment
	const fragment = useFragment();

	// jsx
	return (
		<DialogWrapper
			open={fragment.startsWith("forgot_password")}
			onOpenChange={() => {
				fragment.toggle("forgot_password");
			}}
			title="Account creation"
			description="Create a brand new account."
			className="flex flex-col w-screen! sm:max-w-lg max-w-lg"
			content={<AuthPage type="forgot_password" />}
		/>
	);
};
