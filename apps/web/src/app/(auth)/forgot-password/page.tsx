"use client";

import { Auth, VerifyOrchestrator } from "@/features";
import { Card } from "@/shared";

export default function ForgotPasswordPage() {
	return (
		<div className="flex flex-col gap-2 w-full max-w-sm *:w-full">
			<Card className="z-1 shadowed">
				<Auth type="forgot_password" />
			</Card>

			<VerifyOrchestrator />
		</div>
	);
}
