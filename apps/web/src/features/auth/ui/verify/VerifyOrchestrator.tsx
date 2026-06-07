"use client";

import { AnimatePresence, motion, Variants } from "motion/react";

import { Verify } from "@/features/auth/ui/Verify";
import { VerifySuccess } from "@/features/auth/ui/verify/VerifySuccess";
import { Card, queryStateHooks } from "@/shared";
import { useMounted } from "@/shared/hooks/useMounted";

// Shared animation variants matching your exact CSS styles
const animationVariants: Variants = {
	initial: {
    opacity: 0,
		scale: 0.8,
		y: -100,
	},
	animate: {
    opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.1, 0.25, 1.0],
		},
	},
	exit: {
		opacity: 0,
    scale: 0.8,
		y: -100,
    transition: {
      duration: 0.3,
			ease: [0.25, 0.1, 0.25, 1.0],
    },
	},
};

export const VerifyOrchestrator = () => {
	// states
	const [verify] = queryStateHooks.useVerify();
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
						variants={animationVariants}
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
						variants={animationVariants}
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
