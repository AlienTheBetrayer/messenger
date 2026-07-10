import { ConnectionsDialog } from "@/features/ui/ui/dialogs/ConnectionsDialog";
import { ForgotPasswordDialog } from "@/features/ui/ui/dialogs/ForgotPasswordDialog";
import { LoginDialog } from "@/features/ui/ui/dialogs/LoginDialog";
import { SignupDialog } from "@/features/ui/ui/dialogs/SignupDialog";

export const Dialogs = () => {
	return (
		<>
			<LoginDialog />
			<SignupDialog />
			<ForgotPasswordDialog />
			<ConnectionsDialog />
		</>
	);
};
