import {
	Auth,
	AuthFormProvider,
	AuthFormType,
	VerifyOrchestrator,
} from "@/features";
import { AuthRedirectPopup } from "@/features/auth/ui/other/AuthRedirectPopup";
import { Card } from "@/shared";

export const metadata = {
	title: "Logging in",
};

export function AuthPage({ type }: { type: AuthFormType }) {
	return (
		<AuthFormProvider type={type}>
			<div className="flex flex-col gap-2 w-full *:w-full">
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
