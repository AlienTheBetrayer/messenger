import { type AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import { useGetCodeMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { useNotificationDispatch } from "@/features/notifications/hooks/useNotificationDispatch";
import { NotificationLayout } from "@/features/notifications/ui/layout/NotificationLayout";
import { Button, normalizeError, useQueryStateHooks } from "@/shared";

export const Auth = () => {
	// redux
	const [getCode] = useGetCodeMutation();
	const { notify, promise } = useNotificationDispatch("343434");

	// states
	const { type, authForm } = useAuthFormProvider();
	const [, setVerify] = useQueryStateHooks.verify();

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

			<Button
				type="button"
				onClick={() => {
					notify({ type: "success", text: "hi!!!" });
				}}
			>
				Click me
			</Button>

			<Button
				variant="secondary"
				type="button"
				onClick={() => {
					notify({
						type: "error",
						text: "text",
						extra: { position: "bottom-left" },
					});
				}}
			>
				Do not click me
			</Button>

			<Button
				variant="outline"
				type="button"
				onClick={() => {
					promise(
						() =>
							new Promise<string>((resolve, reject) => {
								setTimeout(() => {
									const rand = Math.random();

									if (rand > 0.5) {
										resolve(rand.toString());
									} else {
										reject(new Error(`${rand} was too much`));
									}
								}, 1000);
							}),
						{
							loading: () => ({
								node: "loading...",
								text: "loading...",
							}),
							success: (data) => ({
								node: (
									<NotificationLayout
										text={`resolved with ${data}`}
										action={<Button>send feedback</Button>}
									/>
								),
								text: `resolved with ${data}`,
							}),
							error: (err) => ({
								node: (
									<NotificationLayout
										text={`errored with ${err instanceof Error ? err.message : "unknown"}`}
										action={<Button>x. retry</Button>}
									/>
								),
								text: `errored with ${err instanceof Error ? err.message : "unknown"}`,
							}),
						},
					);
				}}
			>
				promise me?
			</Button>
		</form>
	);
};
