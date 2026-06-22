"use client";

import { useAuthLogic } from "@/features/auth/hooks/useAuthLogic";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";

export const Verify = () => {
	// states
	const { verify } = useAuthLogic();
	const { verifyForm } = useAuthFormProvider();

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={verifyForm.handleSubmit(verify)}
			className="flex flex-col gap-5"
		>
			<VerifyHeader />
			<VerifyContent />
			<VerifyFooter />
		</form>
	);
};
