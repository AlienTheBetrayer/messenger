import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { VerifySuccessVariants } from "@/features/auth/lib/variants";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared";

export const VerifySuccess = () => {
	// router
	const router = useRouter();

	// variant
	const pathname = usePathname().split("/")[1].replace("-", "_");
	const variant =
		VerifySuccessVariants[pathname as keyof typeof VerifySuccessVariants];

	// jsx
	return (
		<div className="flex flex-col gap-5">
			<CardHeader>
				<CardTitle>{variant.title}</CardTitle>
				<CardDescription>{variant.description}</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-2">
				<Button asChild>
					<Link href={variant.elements.redirectButton.href}>
						{variant.elements.redirectButton.img}
						{variant.elements.redirectButton.text}

						<VerifySuccessTimer
							onRedirect={() => {
								setTimeout(() => {
									redirect(variant.elements.redirectButton.href);
								}, 500);
							}}
						/>
					</Link>
				</Button>
			</CardContent>
		</div>
	);
};

export const VerifySuccessTimer = ({
	onRedirect,
}: {
	onRedirect: () => void;
}) => {
	// states
	const [remaining, setRemaining] = useState<number>(5);
	const redirected = useRef<boolean>(false);

	// interval
	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining((prev) => (prev > 0 ? prev - 1 : prev));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	// redirect
	useEffect(() => {
		if (remaining <= 0 && !redirected.current) {
			redirected.current = true;
			onRedirect();
		}
	}, [remaining, onRedirect]);

	// jsx
	return <span>Redirecting in {remaining}...</span>;
};
