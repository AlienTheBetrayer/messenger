"use client";

import { ConnectionVerificationFormProvider } from "@/features/ui/providers/ConnectionVerificationFormProvider";
import { ConnectionVerificationForm } from "@/features/ui/ui/modals/ConnectionVerificationForm";
import { Dialog, queryStateHooks } from "@/shared";

export const ConnectionVerificationModal = () => {
	// states
	const [connection, setConnection] = queryStateHooks.useConnection();

	// jsx
	return (
		<Dialog
			open={connection === "pending"}
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
