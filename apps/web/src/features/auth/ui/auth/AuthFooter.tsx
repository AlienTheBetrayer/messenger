"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { selectAwaitingConnectionGroup } from "@/features/ui";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Separator,
	Spinner,
	useAppSelector,
} from "@/shared";
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
		<CardFooter className="flex flex-col gap-2">
			<Button
				disabled={!!verify || isLoading}
				type="submit"
				className="w-full"
				form="auth-form"
			>
				{isLoading ? <Spinner /> : <span>Continue</span>}
			</Button>

			{type !== "forgot_password" && (
				<>
					<Separator />

					{awaitingGroup ? (
						<Button
							type="button"
							variant="outline"
							className="w-full"
						>
							<Image
								alt=""
								src="/google.svg"
								width={14}
								height={14}
							/>
							<span>Connect Google with {awaitingGroup.emoji}</span>
						</Button>
					) : (
						<Button
							type="button"
							variant="secondary"
							className="w-full"
							asChild
						>
							<Link href="http://localhost:3001/oauth/google">
								<Image
									alt=""
									src="/google.svg"
									width={14}
									height={14}
								/>
								<span>Continue with Google</span>
							</Link>
						</Button>
					)}

					{awaitingGroup ? (
						<Button
							type="button"
							variant="outline"
							className="w-full"
						>
							<Image
								alt=""
								src="/github.svg"
								width={16}
								height={16}
							/>
							<span>Connect Github with {awaitingGroup.emoji}</span>
						</Button>
					) : (
						<Button
							type="button"
							variant="secondary"
							className="w-full"
							asChild
						>
							<Link href="http://localhost:3001/oauth/github">
								<Image
									alt=""
									src="/github.svg"
									width={16}
									height={16}
								/>
								<span>Continue with Github</span>
							</Link>
						</Button>
					)}
				</>
			)}
		</CardFooter>
	);
};
