"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectAwaitingConnectionGroup } from "@/features/ui/model/ui.selectors";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Separator,
	Spinner,
	useAppSelector,
} from "@/shared";
import DiscordIcon from "@/shared/assets/discord.svg";
import GithubIcon from "@/shared/assets/github.svg";
import GoogleIcon from "@/shared/assets/google.svg";
import TelegramIcon from "@/shared/assets/telegram.svg";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// redux
	const awaitingGroup = useAppSelector((state) =>
		selectAwaitingConnectionGroup(state),
	);

	// states
	const { type } = useAuthFormProvider();
	const isLoading = useIsLoading(["getCode"]);
	const [verify] = queryStateHooks.useVerify();

	// jsx
	return (
		<CardFooter className="flex flex-col gap-0!">
			<Button
				disabled={!!verify || isLoading}
				type="submit"
				className="w-full"
				form="auth-form"
			>
				{isLoading ? <Spinner /> : <span>Continue</span>}
			</Button>

			{type !== "forgot_password" && (
				<AnimatePresence initial={false}>
					{!verify && (
						<motion.div
							className="flex flex-col w-full gap-1 mt-2"
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
											? `http://localhost:3001/connections/connection/init?type=oauth&service=google&groupId=${awaitingGroup.id}`
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
											? `http://localhost:3001/connections/connection/init?type=oauth&service=github&groupId=${awaitingGroup.id}`
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
											? `http://localhost:3001/connections/connection/init?type=oauth&service=discord&groupId=${awaitingGroup.id}`
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

							<Button
								type="button"
								variant={awaitingGroup ? "outline" : "secondary"}
								className="w-full opacity-30"
								inert
								asChild
							>
								<Link
									href={
										awaitingGroup
											? `http://localhost:3001/connections/connection/init?type=oauth&service=telegram&groupId=${awaitingGroup.id}`
											: "http://localhost:3001/oauth/telegram"
									}
								>
									<TelegramIcon />
									{awaitingGroup ? (
										<span>Connect Telegram in {awaitingGroup.emoji}</span>
									) : (
										<span>Continue with Telegram</span>
									)}
								</Link>
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</CardFooter>
	);
};
