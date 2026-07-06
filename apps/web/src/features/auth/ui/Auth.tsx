"use client";

import { UserCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { AuthContent } from "@/features/auth/ui/auth/AuthContent";
import { AuthFooter } from "@/features/auth/ui/auth/AuthFooter";
import { AuthHeader } from "@/features/auth/ui/auth/AuthHeader";
import { Connections } from "@/features/connections/ui/Connections";
import { cn, LogoutMessageBox } from "@/features/ui";
import { selectConnectSessionsAwaitingGroupId } from "@/features/ui/model/ui.selectors";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const Auth = () => {
	// redux
	const authData = useAuth();

	// states
	const { auth } = useAuthActions();
	const { authForm } = useAuthFormProvider();
	const awaiting = useAppSelector((state) =>
		selectConnectSessionsAwaitingGroupId(state),
	);

	// ui states
	const isDisabled = !!(authData && !awaiting);

	// jsx
	return (
		<form
			noValidate
			id="auth-form"
			className={"flex flex-col gap-5 transition-all duration-300 relative"}
			onSubmit={authForm.handleSubmit(auth)}
		>
			<div
				className={cn("flex flex-col gap-5", isDisabled && "opacity-5")}
				inert={isDisabled}
			>
				<AuthHeader />
				<AuthContent />
				<AuthFooter />
			</div>

			<AnimatePresence>
				{isDisabled && (
					<motion.div
						className="flex flex-col gap-1 text-center items-center justify-evenly absolute inset-0 p-2"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15 }}
					>
						<div className="flex flex-col gap-2">
							<span className="text-lg">Authentication is prohibited.</span>
							<span className="text-primary/60">
								This form will be enabled if you log out or attempt to add a new
								connection.
							</span>

							<Connections
								mode="static"
								className="shadowed w-full"
                groupClassName="h-max max-h-none"
							/>
						</div>

						<ul className="flex flex-col gap-1 mt-2 w-full">
							<li className="w-1/2 self-center">
								<Button
									asChild
									className="w-full"
								>
									<Link href="/profile">
										<UserCircle />
										<span>Profile</span>
									</Link>
								</Button>
							</li>

							<li className="w-1/2 self-center">
								<LogoutMessageBox buttonProps={{ size: "default" }} />
							</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</form>
	);
};
