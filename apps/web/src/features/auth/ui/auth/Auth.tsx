import { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { transformError, useQueryState } from "@/shared";
import { AuthSchema } from "@gravity/shared";
import axios from "axios";
import { useCallback } from "react";

type Props = {
	type: AuthFormVariantsType;
};

export const Auth = ({ type }: Props) => {
	// states
	const { authForm } = useAuthFormProvider();
	const [, setVerify] = useQueryState("verify");

	// functions
	const onSubmit = useCallback(
		async (data: AuthSchema) => {
			try {
				await axios.post(`/api/auth/${type}`, data);
				setVerify(type);
			} catch (e: unknown) {
				const message = transformError(e);
				authForm.setError("email", { message });
			}
		},
		[authForm, setVerify, type],
	);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={authForm.handleSubmit(onSubmit)}
			className="flex flex-col gap-5"
		>
			<AuthHeader type={type} />
			<AuthContent type={type} />
			<AuthFooter type={type} />
		</form>
	);
};
