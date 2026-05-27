import { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthFormContent } from "@/features/auth/ui/auth/AuthFormContent";
import { AuthFormFooter } from "@/features/auth/ui/auth/AuthFormFooter";
import { AuthFormHeader } from "@/features/auth/ui/auth/AuthFormHeader";
import { transformError, useQueryState } from "@/shared";
import { AuthSchema } from "@gravity/shared";
import axios from "axios";
import { useCallback } from "react";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthForm = ({ type }: Props) => {
	// states
	const { authForm } = useAuthFormProvider();
	const [, setStep] = useQueryState("step");

	// submit fn
	const onSubmit = useCallback(async (data: AuthSchema) => {
		try {
			await axios.post("/api/auth/signup", data);
			setStep("verify");
		} catch (e: unknown) {
			const message = transformError(e);
			authForm.setError("email", { message });
		}
	}, []);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={authForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5"
		>
			<AuthFormHeader type={type} />
			<AuthFormContent />
			<AuthFormFooter type={type} />
		</form>
	);
};
