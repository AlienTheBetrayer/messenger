import { type AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import { useAuth } from "@/features/auth/hooks/useAuthWatcher";
import { useGetCodeMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button, normalizeError, queryStateHooks } from "@/shared";

export const Auth = () => {
	// redux
	const auth = useAuth();
	const [getCode] = useGetCodeMutation();

	// states
	const { type, authForm } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();

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
		[authForm, setVerify, type, getCode],
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
