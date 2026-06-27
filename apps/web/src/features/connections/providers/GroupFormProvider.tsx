import { GroupFormSchema } from "@gravity/shared";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

import { useGroupForms } from "@/features/connections/hooks/useGroupForms";

export type GroupFormType = {
	groupForm: UseFormReturn<GroupFormSchema>;
} | null;

export const GroupFormContext = createContext<GroupFormType | null>(null);

/**
 * provider that wraps your group form
 * @param children children
 */
export const GroupFormProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// forms
	const forms = useGroupForms();

	// jsx
	return (
		<GroupFormContext.Provider value={{ ...forms }}>
			{children}
		</GroupFormContext.Provider>
	);
};

/**
 * safely accesses the group form context
 * @returns group form provider or throws an error if something went wrong
 */
export const useGroupFormProvider = () => {
	const context = useContext(GroupFormContext);
	if (context === null) {
		throw new Error(
			"useGroupFormProvider must be used within a GroupFormProvider",
		);
	}
	return context;
};
