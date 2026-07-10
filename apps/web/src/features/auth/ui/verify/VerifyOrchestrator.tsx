"use client";

import { AnimatePresence, motion } from "motion/react";

import { VerifyOrchestratorVariants } from "@/features/auth/lib/variants";
import { Verify } from "@/features/auth/ui/Verify";
import { VerifySuccess } from "@/features/auth/ui/verify/VerifySuccess";
import { Card } from "@/shared";
import { useFragment } from "@/shared/hooks/useFragment";

export const VerifyOrchestrator = () => {
	// states
	const fragment = useFragment();

	// jsx
	return (
		<div className="relative w-full">
			<AnimatePresence mode="popLayout">
				{fragment.isAny(
					"forgot_password/verify",
					"signup/verify",
					"login/verify",
				) && (
					<motion.div
						key="pending-form"
						variants={VerifyOrchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<Card className="min-h-0! shadowed">
							<Verify />
						</Card>
					</motion.div>
				)}

				{fragment.isAny(
					"forgot_password/success",
					"signup/success",
					"login/success",
				) && (
					<motion.div
						key="success-form"
						variants={VerifyOrchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
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
