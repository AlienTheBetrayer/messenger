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
	const [step] = useQueryState("step");

	// jsx
	return (
		<div className="flex flex-col gap-2 w-full max-w-sm *:w-full">
			<Card className="z-1">
				<AuthForm type={type} />
			</Card>

			<div
				className="grid w-full transition-all duration-300"
				style={
					step === "verify"
						? {
								gridTemplateRows: "1fr",
								scale: 1,
								opacity: 1,
								translate: `0px 0px`,
							}
						: {
								gridTemplateRows: "0fr",
								scale: 0.8,
								opacity: 0,
								translate: `0px -100px`,
							}
				}
			>
				<Card className="min-h-0!">
					<VerifyForm />
				</Card>
			</div>
		</div>
	);
};
