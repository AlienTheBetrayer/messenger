'use client';

import type { AuthFormVariantsType } from '@/features/auth/lib/variants';

import { AuthFormProvider } from '@/features/auth/providers/AuthFormProvider';
import { AuthFormContent } from '@/features/auth/ui/AuthFormContent';
import { AuthFormFooter } from '@/features/auth/ui/AuthFormFooter';
import { AuthFormHeader } from '@/features/auth/ui/AuthFormHeader';
import { Card } from '@/shared/ui';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthForm = ({ type }: Props) => {
	return (
		<Card className='w-full max-w-sm'>
			<AuthFormProvider>
				<AuthFormHeader type={type} />
				<AuthFormContent />
				<AuthFormFooter type={type} />
			</AuthFormProvider>
		</Card>
	);
};
