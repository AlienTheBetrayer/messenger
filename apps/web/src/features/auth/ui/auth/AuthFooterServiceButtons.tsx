"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import { Button, Separator } from "@/shared";
import DiscordIcon from "@/shared/assets/discord.svg";
import GithubIcon from "@/shared/assets/github.svg";
import GoogleIcon from "@/shared/assets/google.svg";
import { useFragment } from "@/shared/hooks/useFragment";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const AuthFooterServiceButtons = () => {
	// redux
	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const fragment = useFragment();

	// jsx
	return (
		<AnimatePresence initial={false}>
			{!fragment.isAny(
				"forgot_password/verify",
				"login/verify",
				"signup/verify",
			) && (
				<motion.div
					className={"flex flex-col w-full gap-1 mt-2"}
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
				>
					<Separator className="my-1" />

					<Button
						type="button"
						variant={awaitingGroup ? "outline" : "secondary"}
						className="w-full"
						asChild
					>
						<Link
							href={
								awaitingGroup
									? `http://localhost:3001/connections/connection/init?service=google&groupId=${awaitingGroup.id}`
									: "http://localhost:3001/oauth/google"
							}
						>
							<GoogleIcon />
							{awaitingGroup ? (
								<span>Connect Google in {awaitingGroup.emoji}</span>
							) : (
								<span>Continue with Google</span>
							)}
						</Link>
					</Button>

					<Button
						type="button"
						variant={awaitingGroup ? "outline" : "secondary"}
						className="w-full"
						asChild
					>
						<Link
							href={
								awaitingGroup
									? `http://localhost:3001/connections/connection/init?service=github&groupId=${awaitingGroup.id}`
									: "http://localhost:3001/oauth/github"
							}
						>
							<GithubIcon />
							{awaitingGroup ? (
								<span>Connect Github in {awaitingGroup.emoji}</span>
							) : (
								<span>Continue with Github</span>
							)}
						</Link>
					</Button>

					<Button
						type="button"
						variant={awaitingGroup ? "outline" : "secondary"}
						className="w-full"
						asChild
					>
						<Link
							href={
								awaitingGroup
									? `http://localhost:3001/connections/connection/init?service=discord&groupId=${awaitingGroup.id}`
									: "http://localhost:3001/oauth/discord"
							}
						>
							<DiscordIcon />
							{awaitingGroup ? (
								<span>Connect Discord in {awaitingGroup.emoji}</span>
							) : (
								<span>Continue with Discord</span>
							)}
						</Link>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
