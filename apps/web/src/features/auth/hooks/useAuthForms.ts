import {
	AuthFormSchema,
	authFormSchema,
	VerificationFormSchema,
	verificationFormSchema,
} from "@gravity/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

/**
 * generates forms (used only once in the provider)
 * @returns authentication and verification forms
 */
export const useAuthForms = () => {
	// forms
	const authForm = useForm<AuthFormSchema>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		shouldUnregister: false,
	});

	const verifyForm = useForm<VerificationFormSchema>({
		resolver: zodResolver(verificationFormSchema),
		defaultValues: {
			code: "",
		},
	});

	return useMemo(() => {
		return {
			authForm,
			verifyForm,
		};
	}, [authForm, verifyForm]);
};
