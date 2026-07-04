import {
	ConnectionVerifyFormSchema,
	connectionVerifyFormSchema,
} from "@gravity/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const useConnectionVerificationForms = () => {
	// forms
	const connectionVerificationForm = useForm<ConnectionVerifyFormSchema>({
		resolver: zodResolver(connectionVerifyFormSchema),
		defaultValues: {
			code: "",
		},
		shouldUnregister: true,
	});

	return useMemo(
		() => ({
			connectionVerificationForm,
		}),
		[connectionVerificationForm],
	);
};
