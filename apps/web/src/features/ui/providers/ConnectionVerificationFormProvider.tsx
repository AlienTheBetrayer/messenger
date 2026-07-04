import { ConnectionVerifyFormSchema } from "@gravity/shared";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { useConnectionVerificationForms } from "@/features/ui/hooks/useConnectionVerificationForms";

export type ConnectionVerificationFormType = {
	connectionVerificationForm: UseFormReturn<ConnectionVerifyFormSchema>;
} | null;

export const ConnectionVerificationFormContext =
	createContext<ConnectionVerificationFormType>(null);

/**
 * provider that wraps your connection form
 * @param children children
 */
export const ConnectionVerificationFormProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// forms
	const forms = useConnectionVerificationForms();

	// jsx
	return (
		<ConnectionVerificationFormContext.Provider value={{ ...forms }}>
			{children}
		</ConnectionVerificationFormContext.Provider>
	);
};

/**
 * safely accesses the connection form context
 * @returns group form provider or throws an error if something went wrong
 */
export const useConnectionVerificationFormProvider = () => {
	const context = useContext(ConnectionVerificationFormContext);
	if (!context) {
		throw new Error(
			"useConnectionVerificationFormProvider must be used within a ConnectionVerificationFormProvider",
		);
	}
	return context;
};
