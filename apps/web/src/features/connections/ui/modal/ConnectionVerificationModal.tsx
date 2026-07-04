"use client";

import { ConnectionVerificationFormProvider } from "@/features/connections/providers/ConnectionVerificationFormProvider";
import { ConnectionVerificationForm } from "@/features/connections/ui/modal/ConnectionVerificationForm";
import { Dialog, queryStateHooks } from "@/shared";

export const ConnectionVerificationModal = () => {
	// states
	const [connection, setConnection] = queryStateHooks.useConnection();
	const [id] = queryStateHooks.useId();

	// jsx
	return (
		<Dialog
			open={connection === "pending" && !!id}
			onOpenChange={(flag) => {
				if (!flag) {
					setConnection(null);
				}
			}}
		>
			<ConnectionVerificationFormProvider>
				<ConnectionVerificationForm />
			</ConnectionVerificationFormProvider>
		</Dialog>
	);
};
