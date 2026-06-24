"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardFooter,
	queryStateHooks,
	Separator,
	Spinner,
} from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
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

					<Button
						type="button"
						variant="secondary"
						className="w-full"
						asChild
					>
						{/* redirect to the actual backend url later */}
						<Link href="http://localhost:3001/oauth/google">
							<Image
								alt=""
								src="/google.svg"
								width={14}
								height={14}
							/>
							Continue with Google
						</Link>
					</Button>

					<Button
						type="button"
						variant="secondary"
						className="w-full"
						asChild
					>
						{/* redirect to the actual backend url later */}
						<Link href="http://localhost:3001/oauth/github">
							<Image
								alt=""
								src="/github.svg"
								width={16}
								height={16}
							/>
							Continue with Github
						</Link>
					</Button>
				</>
			)}
		</CardFooter>
	);
};
