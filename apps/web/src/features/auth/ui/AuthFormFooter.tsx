import {
	AuthFormVariants,
	AuthFormVariantsType,
} from '@/features/auth/lib/variants';
import { Button, CardFooter } from '@/shared/ui';
import { Field } from '@/shared/ui/field';
import Image from 'next/image';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFormFooter = ({ type }: Props) => {
	// jsx variants
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardFooter className="flex-col gap-2">
			<Field orientation="vertical">
				<Button type="submit" className="w-full" form="auth-form">
					{variant.buttonText}
				</Button>
				<Button type="button" variant="secondary" className="w-full">
					<Image alt="" src="/google.svg" width={14} height={14} />
					{variant.buttonText} with Google
				</Button>
			</Field>
		</CardFooter>
	);
};
