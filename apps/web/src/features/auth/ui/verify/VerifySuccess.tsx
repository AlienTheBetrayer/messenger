import Link from "next/link";
import { usePathname } from "next/navigation";

import { VerifySuccessVariants } from "@/features/auth/lib/variants";
import {
	Button,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	queryStateHooks,
} from "@/shared";

export const VerifySuccess = () => {
	// variant
	const pathname = usePathname().split("/")[1].replace("-", "_");
	const variant =
		VerifySuccessVariants[pathname as keyof typeof VerifySuccessVariants];

	// nuqs
	const [, setVerify] = queryStateHooks.useVerify();

	// jsx
	return (
		<div className="flex flex-col gap-5">
			<CardHeader>
				<CardTitle>{variant.title}</CardTitle>
				<CardDescription>{variant.description}</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-2">
				<Button asChild>
					<Link
						href={variant.elements.redirectButton.href}
						onClick={() => setVerify(null)}
					>
						{variant.elements.redirectButton.img}
						{variant.elements.redirectButton.text}
					</Link>
				</Button>
			</CardContent>
		</div>
	);
};
