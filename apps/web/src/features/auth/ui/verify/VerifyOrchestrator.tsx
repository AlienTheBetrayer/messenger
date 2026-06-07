"use client";

import { Verify } from "@/features/auth/ui/Verify";
import { VerifySuccess } from "@/features/auth/ui/verify/VerifySuccess";
import { Card, queryStateHooks } from "@/shared";
import { useMounted } from "@/shared/hooks/useMounted";

export const VerifyOrchestrator = () => {
	// states
	const [verify] = queryStateHooks.useVerify();
	const mounted = useMounted();

	if (!mounted) {
		return null;
  }
  
	// jsx
	return (
		<div className="relative *:absolute *:top-0">
			<div
				className="grid w-full transition-all duration-300"
				style={
					verify === "pending"
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
				<Card className="min-h-0! shadowed">
					<Verify />
				</Card>
			</div>

			<div
				className="grid w-full transition-all duration-300"
				style={
					verify === "success"
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
				<Card className="min-h-0! shadowed">
					<VerifySuccess />
				</Card>
			</div>
		</div>
	);
};
