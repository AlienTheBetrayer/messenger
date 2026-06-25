"use client";

import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";

export const Auth = () => {
	// states
	const { auth } = useAuthActions();
	const { authForm } = useAuthFormProvider();

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			className="flex flex-col gap-5 transition-all duration-300"
			onSubmit={authForm.handleSubmit(auth)}
		>
			<AuthHeader />
			<AuthContent />
			<AuthFooter />
		</form>
	);
};
