/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Image from "next/image";
import Link from "next/link";

import {
	AuthFormVariants,
	type AuthFormVariantsType,
} from "@/features/auth/lib/variants";
import { Button, CardFooter, useQueryState } from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFooter = ({ type }: Props) => {
	// states
	const [verify] = useQueryState("verify");

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
					disabled={!!verify}
				>
					{variant.elements.submitButton.text}
				</Button>
			)}

			{variant.elements.serviceButtons.enabled && (
				<Button
					type="button"
					variant="secondary"
					className="w-full"
					disabled={!!verify}
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
			)}

			{variant.elements.serviceButtons.enabled && (
				<Button
					type="button"
					variant="secondary"
					className="w-full"
					disabled={!!verify}
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
