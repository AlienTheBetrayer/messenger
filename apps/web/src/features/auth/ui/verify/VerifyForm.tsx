import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { VerifyFormContent } from "@/features/auth/ui/verify/VerifyFormContent";
import { VerifyFormFooter } from "@/features/auth/ui/verify/VerifyFormFooter";
import { VerifyFormHeader } from "@/features/auth/ui/verify/VerifyFormHeader";
import axios from "axios";
import { useCallback, useState } from "react";

export const VerifyForm = () => {
	const [code, setCode] = useState<string>("");
	const { verifyForm } = useAuthFormProvider();

	// submit fn
	const onSubmit = useCallback(async () => {
		const values = verifyForm.getValues();
		await axios.post(
			"/api/auth/signup",
			{ email: values.email, password: values.password },
			{
				params: {
					code,
				},
			},
		);
	}, [verifyForm, code]);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={verifyForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5"
		>
			<VerifyFormHeader />
			<VerifyFormContent />
			<VerifyFormFooter />
		</form>
	);
};
