import Link from 'next/link';

import {
	type AuthFormVariantsType,
	AuthFormVariants,
} from '@/features/auth/lib/variants';
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	Button,
} from '@/shared';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFormHeader = ({ type }: Props) => {
	// jsx variants
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardHeader>
			<CardTitle>{variant.title}</CardTitle>
			<CardDescription>{variant.description}</CardDescription>
			<CardAction>
				<Button variant='link' asChild>
					<Link href={variant.href}>{variant.linkText}</Link>
				</Button>
			</CardAction>
		</CardHeader>
	);
};
