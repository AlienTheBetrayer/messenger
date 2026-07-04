"use client";

import { ConnectionVerifyFormSchema } from "@gravity/shared";
import { useCallback, useMemo } from "react";

export const useConnectionVerificationActions = () => {
	const verify = useCallback((data: ConnectionVerifyFormSchema) => {
		console.log("yes");
	}, []);

	return useMemo(
		() => ({
			verify,
		}),
		[verify],
	);
};
