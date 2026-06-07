import Link from "next/link";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
	queryStateHooks,
} from "@/shared";

export const AuthHeader = () => {
	// states
	const { type } = useAuthFormProvider();

	const [, setVerify] = queryStateHooks.useVerify();

	// ui states
	const variant = AuthFormVariants[type];
	const headerLink = variant.elements.headerLink;

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription>{variant.description}</CardDescription>

			{headerLink.enabled && (
				<CardAction>
					<Button
						variant="link"
						asChild
					>
						<Link href={headerLink.href}>{headerLink.text}</Link>
					</Button>

					<Button
						onClick={() => {
							setVerify((prev) =>
								prev === "pending"
									? "success"
									: prev === "success"
										? "pending"
										: null,
							);
						}}
					>
						change
					</Button>
				</CardAction>
			)}
		</CardHeader>
	);
};
