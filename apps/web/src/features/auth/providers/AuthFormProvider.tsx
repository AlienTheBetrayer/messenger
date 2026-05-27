"use client";

import { UseFormReturn } from "react-hook-form";

import { useAuthForms } from "@/features/auth/hooks/useAuthForms";
import { AuthSchema } from "@gravity/shared";
import { createContext, useContext } from "react";
 
// 1. ✅ create a provider context
// 2. ✅ wrap two forms' datas into it
// 3. ✅ make the second form popup
// 4. ✅ make the second form consume data from the first one
// 5. fix second form animation
// 6. confirm logic

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
