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
import { normalizeError, queryStateHooks } from "@/shared";

export const Verify = () => {
	// redux
	const [login] = useLoginMutation();
	const [signup] = useSignupMutation();
	const [forgotPassword] = useForgotPasswordMutation();

	// states
	const { type, verifyForm, authForm } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();

	// verify fn
	const onSubmit = useCallback(
		async (data: VerificationFormSchema) => {
			// triggering the auth form and getting values
			const isValid = await authForm.trigger();
			if (!isValid) return;

			const values = authForm.getValues();

			// api requests
			try {
				switch (type) {
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

					case "forgot_password": {
						await forgotPassword({
							email: values.email,
							password: values.password,
							code: data.code,
						}).unwrap();
						break;
					}
					default: {
						verifyForm.setError("code", { message: "Invalid URL state." });
						return;
					}
				}

				setVerify("success");
			} catch (e) {
				// error handling
				const message = normalizeError(e);
				verifyForm.setError("code", { message });
			} finally {
				verifyForm.reset();
			}
		},
		[verifyForm, authForm, type, setVerify, login, signup, forgotPassword],
	);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={verifyForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5"
		>
			<VerifyHeader />
			<VerifyContent />
			<VerifyFooter />
		</form>
	);
};
