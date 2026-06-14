"use client";

import { type AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import { useAuthNotifications } from "@/features/auth/hooks/useAuthNotifications";
import { useGetCodeMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { normalizeError, queryStateHooks } from "@/shared";

export const Auth = () => {
	// redux
	const [getCode] = useGetCodeMutation();

	// states
	const { type, authForm } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();

	// notifications
	const notifications = useAuthNotifications();

	// functions
	const onSubmit = useCallback(
		(data: AuthFormSchema) => {
			const fn = async () => {
				try {
					const res = await getCode({ email: data.email, type }).unwrap();
					setVerify("pending");
					return res;
				} catch (e) {
					const message = normalizeError(e);
					authForm.setError("email", { message });
					throw new Error(message);
				}
			};

			notifications.auth(fn);
		},
		[authForm, type, notifications, setVerify, getCode],
	);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={authForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5 transition-all duration-300"
		>
			<AuthHeader />
			<AuthContent />
			<AuthFooter />
		</form>
	);
};
