import Image from "next/image";
import Link from "next/link";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { Button, CardFooter, Separator, Spinner } from "@/shared";
import { useIsLoading } from "@/shared/model/redux.selectors";

export const AuthFooter = () => {
	// states
	const { type } = useAuthFormProvider();
	const isLoading = useIsLoading(["getCode"]);

	// ui states
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardFooter className="flex flex-col gap-2">
			{variant.elements.submitButton.enabled && (
				<Button
					type="submit"
					className="w-full"
					form="auth-form"
				>
					{isLoading && <Spinner />}
					{variant.elements.submitButton.text}
				</Button>
			)}

			{variant.elements.serviceButtons.enabled && (
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
				</>
			)}

			{variant.elements.serviceButtons.enabled && (
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
			)}
		</CardFooter>
	);
};
