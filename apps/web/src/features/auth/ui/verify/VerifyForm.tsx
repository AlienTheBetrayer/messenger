import { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyFormContent } from "@/features/auth/ui/verify/VerifyFormContent";
import { VerifyFormFooter } from "@/features/auth/ui/verify/VerifyFormFooter";
import { VerifyFormHeader } from "@/features/auth/ui/verify/VerifyFormHeader";
import { VerifySchema } from "@gravity/shared";
import axios from "axios";
import { useCallback } from "react";

type Props = {
  type: AuthFormVariantsType;
}

export const VerifyForm = ({ type }: Props) => {
	const { verifyForm, authForm } = useAuthFormProvider();

	// submit fn
	const onSubmit = useCallback(
		async (data: VerifySchema) => {
			const isValid = await authForm.trigger();

			if (!isValid) {
				return;
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
      <VerifyFormHeader type={type} />
			<VerifyFormContent />
			<VerifyFormFooter />
		</form>
	);
};
