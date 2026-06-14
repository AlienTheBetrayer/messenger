import { verification_code_type } from "@gravity/shared";

import { Auth, AuthFormProvider, VerifyOrchestrator } from "@/features";
import { AuthRedirectPopup } from "@/features/auth/ui/other/AuthRedirectPopup";
import { Card } from "@/shared";

export function AuthPage({ type }: { type: verification_code_type }) {
	return (
		<AuthFormProvider type={type}>
			<div className="flex flex-col gap-2 w-full max-w-sm *:w-full">
				<Card className="z-1 shadowed">
					<Auth />
				</Card>

				<VerifyOrchestrator />
				<AuthRedirectPopup />
			</div>
		</AuthFormProvider>
	);
}

export default function LoginPage() {
  return <AuthPage type="login" />;
}

