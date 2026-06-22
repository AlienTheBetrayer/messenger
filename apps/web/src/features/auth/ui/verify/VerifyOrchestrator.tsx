"use client";

import { AnimatePresence, motion, Variants } from "motion/react";

import { Verify } from "@/features/auth/ui/Verify";
import { VerifySuccess } from "@/features/auth/ui/verify/VerifySuccess";
import { Card, queryStateHooks } from "@/shared";
import { useMounted } from "@/shared/hooks/useMounted";

const orchestratorVariants: Variants = {
	initial: {
		opacity: 0,
		y: 8,
		scale: 0.98,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.25,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -8,
		scale: 0.98,
		transition: {
			duration: 0.2,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

export const VerifyOrchestrator = () => {
	// states
	const [authType] = queryStateHooks.useAuthType();
	const mounted = useMounted();

	if (!mounted) {
		return null;
	}

	// ui states
	const isActive =
		authType === "verify-pending" || authType === "verify-success";

	// jsx
	return (
		<div
			className={`w-full transition-all duration-300 ${isActive ? "mt-4" : "mt-0"}`}
		>
			<AnimatePresence mode="wait">
				{authType === "verify-pending" && (
					<motion.div
						key="pending-form"
						variants={orchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="w-full"
					>
						<Card className="min-h-0! shadowed overflow-hidden rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-sm shadow-xl relative">
							<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] pointer-events-none rounded-2xl" />
							<Verify />
						</Card>
					</motion.div>
				)}

				{authType === "verify-success" && (
					<motion.div
						key="success-form"
						variants={orchestratorVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="w-full"
					>
						<Card className="min-h-0! shadowed overflow-hidden rounded-2xl border border-border/60 bg-muted/20 backdrop-blur-sm shadow-xl relative">
							<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] pointer-events-none rounded-2xl" />
							<VerifySuccess />
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
