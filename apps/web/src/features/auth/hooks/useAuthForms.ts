import {
	authSchema,
	verifySchema,
	VerifySchema,
	type AuthSchema,
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

	const verifyForm = useForm<VerifySchema>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: "",
		},
	});

	// return
	return useMemo(() => {
		return {
			authForm,
			verifyForm,
		};
	}, [authForm, verifyForm]);
};
