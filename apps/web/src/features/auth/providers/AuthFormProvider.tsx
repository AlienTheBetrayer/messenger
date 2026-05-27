"use client";

import { UseFormReturn } from "react-hook-form";

import { useAuthForms } from "@/features/auth/hooks/useAuthForms";
import { AuthSchema } from "@gravity/shared";
import { createContext, useContext } from "react";

type AuthFormData = {
	authForm: UseFormReturn<AuthSchema>;
	verifyForm: UseFormReturn<AuthSchema>;
};

export const AuthFormContext = createContext<AuthFormData | null>(null);

type Props = {
	children: React.ReactNode;
};

export const AuthFormProvider = ({ children }: Props) => {
	// form
	const { authForm, verifyForm } = useAuthForms();

	return (
		<AuthFormContext.Provider value={{ authForm, verifyForm }}>
			{children}
		</AuthFormContext.Provider>
	);
};

export const useAuthFormProvider = () => {
	const ctx = useContext(AuthFormContext);

	if (!ctx) {
		throw new Error(
			"useFormProvider must be used within a <AuthFormProvider />",
		);
	}

	return ctx;
};
