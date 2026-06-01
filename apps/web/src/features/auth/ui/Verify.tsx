import { VerificationFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import {
	useForgotPasswordMutation,
	useLoginMutation,
	useSignupMutation,
} from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";
import { normalizeError, useQueryState } from "@/shared";

export const Verify = () => {
	// redux
	const [login] = useLoginMutation();
	const [signup] = useSignupMutation();
	const [forgotPassword] = useForgotPasswordMutation();

	// states
	const { verifyForm, authForm } = useAuthFormProvider();
	const [verify] = useQueryState("verify");

	// verify fn
	const onSubmit = useCallback(
		async (data: VerificationFormSchema) => {
			// triggering the auth form and getting values
			const isValid = await authForm.trigger();
			if (!isValid) return;

			const values = authForm.getValues();

			// api requests
			try {
				switch (verify) {
					case "login": {
						await login({
							email: values.email,
							password: values.password,
							code: data.code,
						}).unwrap();

						break;
					}
					case "signup": {
						await signup({
							email: values.email,
							password: values.password,
							code: data.code,
						}).unwrap();
						break;
					}

					case "forgot-password": {
						await forgotPassword({
							email: values.email,
							password: values.password,
							code: data.code,
						}).unwrap();
						break;
					}
					default: {
						verifyForm.setError("code", { message: "Invalid URL state." });
						break;
					}
				}
			} catch (e) {
				// error handling
				const message = normalizeError(e);
				verifyForm.setError("code", { message });
			}
		},
		[verifyForm, authForm, verify, login, signup, forgotPassword],
	);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={(e) => {
				void verifyForm.handleSubmit(onSubmit)(e);
			}}
			className="flex flex-col gap-5"
		>
			<VerifyHeader />
			<VerifyContent />
			<VerifyFooter />
		</form>
	);
};
