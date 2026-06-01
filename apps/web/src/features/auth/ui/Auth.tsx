import type { AuthFormSchema } from "@gravity/shared";
import { useCallback } from "react";

import type { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { useGetCodeMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { normalizeError, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const Auth = ({ type }: Props) => {
  // redux
  const [getCode] = useGetCodeMutation();
  
	// states
	const { authForm } = useAuthFormProvider();
  const [, setVerify] = useQueryState("verify");

	// functions
	const onSubmit = useCallback(
		async (data: AuthFormSchema) => {
			try {
				await getCode({ email: data.email, type }).unwrap();
				setVerify(type);
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
			onSubmit={(e) => {
				void authForm.handleSubmit(onSubmit)(e);
			}}
			className="flex flex-col gap-5 transition-all duration-300"
		>
			<AuthHeader type={type} />
			<AuthContent type={type} />
			<AuthFooter type={type} />
		</form>
	);
};
