"use client";

import { AnimatePresence, motion } from "motion/react";

import { VerifyOrchestratorVariants } from "@/features/auth/lib/variants";
import { Verify } from "@/features/auth/ui/Verify";
import { VerifySuccess } from "@/features/auth/ui/verify/VerifySuccess";
import { Card, queryStateHooks, useMounted } from "@/shared";

export const VerifyOrchestrator = () => {
	// states
	const [verify] = queryStateHooks.useVerify();

	// fallback
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	// jsx
	return (
		<div className="relative w-full">
			<AnimatePresence mode="popLayout">
				{verify === "pending" && (
					<motion.div
						key="pending-form"
						variants={VerifyOrchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="absolute top-0 left-0 w-full"
					>
						<Card className="min-h-0! shadowed">
							<Verify />
						</Card>
					</motion.div>
				)}

				{verify === "success" && (
					<motion.div
						key="success-form"
						variants={VerifyOrchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="absolute top-0 left-0 w-full"
					>
						<Card className="min-h-0! shadowed">
							<VerifySuccess />
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
