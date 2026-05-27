import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { ForgotPasswordContent } from "@/features/auth/ui/forgot-password/ForgotPasswordContent";
import { ForgotPasswordFooter } from "@/features/auth/ui/forgot-password/ForgotPasswordFooter";
import { ForgotPasswordHeader } from "@/features/auth/ui/forgot-password/ForgotPasswordHeader";
import { useQueryState } from "@/shared";
import { useCallback } from "react";

export const ForgotPassword = () => {
	// states
	const { forgotPasswordForm } = useAuthFormProvider();
	const [, setVerify] = useQueryState("verify");

	// functions
	const onSubmit = useCallback(async () => {
		setVerify("forgot-password");
	}, [setVerify]);

	// jsx
	return (
		<form
			noValidate
			id="forgot-password-form"
			onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5"
		>
			<ForgotPasswordHeader />
			<ForgotPasswordContent />
			<ForgotPasswordFooter />
		</form>
	);
};
