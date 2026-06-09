import { type AuthFormSchema } from "@gravity/shared";
import { useCallback, useEffect } from "react";

import { useGetCodeMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { normalizeError, queryStateHooks } from "@/shared";

export const Auth = () => {
	// redux
	const [getCode] = useGetCodeMutation();
	const { notify } = useNotificationDispatch();

	// states
	const { type, authForm } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();

	useEffect(() => {
		notify({ text: "Check your email", type: "success" });
	}, [notify]);

	// functions
	const onSubmit = useCallback(
		async (data: AuthFormSchema) => {
			try {
				await getCode({ email: data.email, type }).unwrap();
				setVerify("pending");
			} catch (e) {
				const message = normalizeError(e);
				authForm.setError("email", { message });
			}
		},
		[authForm, type, setVerify, getCode],
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
