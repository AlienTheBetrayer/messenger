import type { AuthSchema } from "@gravity/shared";
import { useCallback } from "react";

import type { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { useAuthMutation } from "@/features/auth/model/auth.slice";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { normalizeError, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const Auth = ({ type }: Props) => {
	// states
	const { authForm } = useAuthFormProvider();
	const [verify, setVerify] = useQueryState("verify");
	const [auth] = useAuthMutation();

	// functions
	const onSubmit = useCallback(
		async (data: AuthSchema) => {
			try {
				await auth({ ...data, type }).unwrap();
				setVerify(type);
			} catch (e) {
				const message = normalizeError(e);
				authForm.setError("email", { message });
			}
		},
		[authForm, setVerify, type, auth],
	);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			onSubmit={(e) => {
				void authForm.handleSubmit(onSubmit)(e);
			}}
			className={`flex flex-col gap-5 transition-all duration-300 ${verify ? "opacity-30" : ""}`}
			inert={!!verify}
		>
			<AuthHeader type={type} />
			<AuthContent type={type} />
			<AuthFooter type={type} />
		</form>
	);
};
