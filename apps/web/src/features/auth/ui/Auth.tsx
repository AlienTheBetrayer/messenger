import { type AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

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
	const [getCode] = useGetCodeMutation();
	const { notify, promise } = useNotificationDispatch();

	// states
	const { type, authForm } = useAuthFormProvider();
	const [, setVerify] = queryStateHooks.useVerify();

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
          throw e;
				}
			};

			const pushPromise = () => {
				promise(fn, {
					error: (err) => ({
						node: (
							<NotificationLayout
								text="Code generation failed."
								action={
									<Button
										onClick={() => {
											pushPromise();
										}}
									>
										Retry
									</Button>
								}
							/>
						),
						text: "error",
					}),
					success: (ret) => ({
						node: `Code sent to ${data.email}!`,
						text: `Code sent to ${data.email}!`,
					}),
				});
			};

      pushPromise();
		},
		[authForm, type, setVerify, getCode, promise],
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
