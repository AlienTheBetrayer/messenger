import { AuthPage } from "@/app/(other)/(auth)/login/page";
import { InterceptionDialog } from "@/shared/ui";

export default function SignupModal() {
	return (
		<InterceptionDialog
			title="Authentication"
			description="Create a new account to get started."
			className="max-w-lg!"
		>
			<AuthPage type="signup" />
		</InterceptionDialog>
	);
}
