"use client";

import { AuthPage } from "@/features/auth/ui/AuthPage";
import { useFragment } from "@/shared/hooks/useFragment";
import { DialogWrapper } from "@/shared/ui";

export const SignupDialog = () => {
	// fragment
	const fragment = useFragment();

	// jsx
	return (
		<DialogWrapper
			open={fragment.startsWith("signup")}
			onOpenChange={() => {
				fragment.toggle("signup");
			}}
			title="Account creation"
			description="Create a brand new account."
			className="flex flex-col w-screen! sm:max-w-lg max-w-lg"
			content={<AuthPage type="signup" />}
		/>
	);
};
