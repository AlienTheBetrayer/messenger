import { VerificationSchema } from "@gravity/shared";
import { useCallback } from "react";

import { useAuthVerifyMutation } from "@/features/auth/model/verify.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";
import { normalizeError, useQueryState } from "@/shared";

export const Verify = () => {
	// states
	const { verifyForm, authForm } = useAuthFormProvider();
	const [verify] = useQueryState("verify");
	const [authVerify] = useAuthVerifyMutation();

	// verify fn
	const onSubmit = useCallback(
		async (data: VerificationSchema) => {
			switch (verify) {
				case "signup":
				case "login":
				case "forgot-password": {
					const isValid = await authForm.trigger();

					if (!isValid) {
						break;
					}

					const values = authForm.getValues();

					try {
						await authVerify({ ...values, ...data, type: verify }).unwrap();
					} catch (e: unknown) {
						const message = normalizeError(e);
						verifyForm.setError("code", { message });
					}

					break;
				}
				default: {
					verifyForm.setError("code", { message: "Invalid URL state." });
					break;
				}
			}
		},
		[verifyForm, authVerify, authForm, verify],
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
