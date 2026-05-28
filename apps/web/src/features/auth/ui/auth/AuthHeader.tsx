/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Link from "next/link";

import {
	AuthFormVariants,
	type AuthFormVariantsType,
} from "@/features/auth/lib/variants";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthHeader = ({ type }: Props) => {
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
				</CardAction>
			)}
		</CardHeader>
	);
};
