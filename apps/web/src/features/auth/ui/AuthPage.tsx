import {
	AuthFormProvider,
	AuthFormType,
} from "@/features/auth/providers/AuthFormProvider";
import { Auth } from "@/features/auth/ui/Auth";
import { AuthRedirectPopup } from "@/features/auth/ui/other/AuthRedirectPopup";
import { VerifyOrchestrator } from "@/features/auth/ui/verify/VerifyOrchestrator";
import { Card } from "@/shared";

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
