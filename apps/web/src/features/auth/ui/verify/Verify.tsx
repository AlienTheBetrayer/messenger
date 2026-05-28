import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyContent } from "@/features/auth/ui/verify/VerifyContent";
import { VerifyFooter } from "@/features/auth/ui/verify/VerifyFooter";
import { VerifyHeader } from "@/features/auth/ui/verify/VerifyHeader";
import { useQueryState } from "@/shared";
import { VerifySchema } from "@gravity/shared";
import axios from "axios";
import { useCallback } from "react";

export const Verify = () => {
	// states
	const { verifyForm, authForm } = useAuthFormProvider();
	const [verify] = useQueryState("verify");

	// submit fn
	const onSubmit = useCallback(
		async (data: VerifySchema) => {
			switch (verify) {
				case "signup":
				case "login": {
					const isValid = await authForm.trigger();

					if (!isValid) {
						break;
					}

					const values = verifyForm.getValues();
					await axios.post(
						"/api/auth/signup",
						{ email: values.email, password: values.password },
						{
							params: {
								code: data.code,
							},
						},
					);
					break;
				}
				case "forgot-password": {
					const isValid = await authForm.trigger();

					if (!isValid) {
						break;
					}

					const values = authForm.getValues();
					await axios.post(
						"/api/auth/forgot-password",
						{ email: values.email, password: values.password },
						{
							params: {
								code: data.code,
							},
						},
					);

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
		[verifyForm, authForm],
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
