"use client";

import { usersType, VerificationFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import { useAuthNotifications } from "@/features/auth/hooks/useAuthNotifications";
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

	// notifications
	const notifications = useAuthNotifications();

	// verify fn
	const onSubmit = useCallback(
		async (data: VerificationFormSchema) => {
			// triggering the auth form and getting values
			const isValid = await authForm.trigger();

			if (!isValid) {
				return;
			}

			const values = authForm.getValues();

			// api requests
			const fn = async () => {
				try {
					let user: usersType | null = null;

					switch (type) {
						case "login": {
							const ret = await login({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}
						case "signup": {
							const ret = await signup({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}

						case "forgot_password": {
							const ret = await forgotPassword({
								email: values.email,
								password: values.password,
								code: data.code,
							}).unwrap();

							user = ret.user;
							break;
						}
					}

					setVerify("success");
					return user;
				} catch (e) {
					// error handling
					const message = normalizeError(e);
					verifyForm.setError("code", { message });
					throw new Error(message);
				}
			};

			notifications.verify(fn);
		},
		[
			verifyForm,
			authForm,
			type,
			notifications,
			setVerify,
			login,
			signup,
			forgotPassword,
		],
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
