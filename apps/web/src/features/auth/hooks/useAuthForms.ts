import {
	AuthSchema,
	authSchema,
	VerificationSchema,
	verificationSchema,
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
	const authForm = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		shouldUnregister: false,
	});

	const verifyForm = useForm<VerificationSchema>({
		resolver: zodResolver(verificationSchema),
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
