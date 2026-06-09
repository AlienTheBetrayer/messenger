import { type AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

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
				}
			};

			promise(fn, {
				loading: ({ id }) => ({
					node: "started loading...",
					text: "started loading...",
				}),
				error: (err) => ({
					node: "error!",
					text: "error",
				}),
				success: (data) => ({
					node: `code sent to ${data?.email}`,
					text: `code sent to ${data?.email}`,
				}),
			});
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
