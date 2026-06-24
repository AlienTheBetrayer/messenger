import { verification_code_type } from "@gravity/shared";

import {
	Auth,
	AuthFormProvider,
	AuthRedirectPopup,
	VerifyOrchestrator,
} from "@/features/auth";
import { Card } from "@/shared";

export const metadata = {
	title: "Logging in",
};

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
