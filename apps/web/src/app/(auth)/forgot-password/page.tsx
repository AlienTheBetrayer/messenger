"use client";

import { ForgotPassword, VerifyOrchestrator } from "@/features";
import { Card } from "@/shared";

export default function ForgotPasswordPage() {
	return (
		<div className="flex flex-col gap-2 w-full max-w-sm *:w-full">
			<Card className="z-1">
				<ForgotPassword />
			</Card>

			<VerifyOrchestrator />
		</div>
	);
}
