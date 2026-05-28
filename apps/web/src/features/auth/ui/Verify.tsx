import type { VerifySchema } from "@gravity/shared";
import axios from "axios";
import { useCallback } from "react";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";
import { transformError, useQueryState } from "@/shared";

export const Verify = () => {
	// states
	const { verifyForm, authForm } = useAuthFormProvider();
	const [verify] = useQueryState("verify");

	// verify fn
	const onSubmit = useCallback(
		async (data: VerifySchema) => {
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
						await axios.post(`/api/auth/${verify}`, {
							email: values.email,
							password: values.password,
							code: data.code,
						});
					} catch (e: unknown) {
						const message = transformError(e);
						verifyForm.setError("code", { message });
					}

					break;
				}
				case "forgot-email": {
					break;
				}
				default: {
					verifyForm.setError("code", { message: "Invalid URL state." });
					break;
				}
			}
		},
		[verifyForm, authForm, verify],
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
