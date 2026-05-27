"use client";

import type { AuthFormVariantsType } from "@/features/auth/lib/variants";
import { AuthForm } from "@/features/auth/ui/auth/AuthForm";
import { VerifyForm } from "@/features/auth/ui/verify/VerifyForm";
import { Card, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthOrchestrator = ({ type }: Props) => {
	// states
	const [step, setStep] = useQueryState("step");

	// jsx
	return (
		<div className="flex flex-col gap-2 w-full max-w-sm *:w-full">
			<Card>
				<AuthForm type={type} />
			</Card>

			<div
				className="grid w-full transition-all duration-300"
				style={{ gridTemplateRows: step === "verify" ? "1fr" : "0fr" }}
			>
				<Card className="min-h-0!">
					<VerifyForm />
				</Card>
			</div>
		</div>
	);
};
