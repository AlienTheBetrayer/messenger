"use client";

import { useAuthLogic } from "@/features/auth/hooks/useAuthLogic";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";

export const Auth = () => {
	// states
	const { authForm } = useAuthFormProvider();
	const { auth } = useAuthLogic();

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			className="flex flex-col gap-6 relative"
			onSubmit={authForm.handleSubmit(auth)}
		>
			<AuthHeader />
			<div className="flex flex-col gap-5 px-6">
				<AuthContent />
			</div>
			<AuthFooter />
		</form>
	);
};
