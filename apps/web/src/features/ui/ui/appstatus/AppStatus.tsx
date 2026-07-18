"use client";

import { AnimatePresence, motion } from "motion/react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Card, CardContent } from "@/shared";

export const AppStatus = () => {
	// auth
	const auth = useAuth();

	// jsx
	return (
    <AnimatePresence initial={false}>
			{auth?.user && (
        <motion.div
          className="fixed left-2 bottom-2 w-screen max-w-64"
					initial={{ scale: 0.9, y: 200, opacity: 0.5 }}
					animate={{ scale: 1, y: 0, opacity: 1 }}
					exit={{ scale: 0.9, y: 200, opacity: 0.5 }}
				>
					<Card className="w-full">
						<CardContent />
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
