"use client";

import {
  AuthFormSchema, VerificationFormSchema
} from "@gravity/shared";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { useAuthForms } from "@/features/auth/hooks/useAuthForms";

export type AuthFormType = "login" | "signup" | "forgot_password";

/**
 * context
 */
type AuthFormData = {
	authForm: UseFormReturn<AuthFormSchema>;
	verifyForm: UseFormReturn<VerificationFormSchema>;
	type: AuthFormType
};

export const AuthFormContext = createContext<AuthFormData | null>(null);

/**
 * provider
 */
export const AuthFormProvider = ({
	type,
	children,
}: {
	type:AuthFormType ;
	children: React.ReactNode;
}) => {
	// form
	const forms = useAuthForms();

	return (
		<AuthFormContext.Provider value={{ ...forms, type }}>
			{children}
		</AuthFormContext.Provider>
	);
};

/**
 * hook to access form context (must be used in a component within an <AuthFormProvider />)
 * @returns reactive context data
 */
export const useAuthFormProvider = () => {
	const ctx = useContext(AuthFormContext);

	if (!ctx) {
		throw new Error(
			"useFormProvider must be used within an <AuthFormProvider />",
		);
	}

	return ctx;
};
