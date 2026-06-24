import Link from "next/link";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared";

export const AuthHeader = () => {
	// states
	const { type } = useAuthFormProvider();

	// ui states
	const variant = AuthFormVariants[type];
	const headerLink = {
		href: type === "login" ? "/signup" : "/login",
		text: type === "login" ? "Sign up" : "Log in",
	};

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription >{variant.description}</CardDescription>

			<CardAction>
				<Button
					variant="link"
					asChild
				>
					<Link href={headerLink.href}>{headerLink.text}</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
