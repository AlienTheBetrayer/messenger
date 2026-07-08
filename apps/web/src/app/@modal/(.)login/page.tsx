import { AuthPage } from "@/app/(other)/(auth)/login/page";
import { InterceptionDialog } from "@/shared/ui";

export default function LoginModal() {
	return (
		<InterceptionDialog
			title="Authentication"
			description="Log in to your account. Secure."
			className="max-w-lg!"
		>
			<AuthPage type="login" />
		</InterceptionDialog>
	);
}
