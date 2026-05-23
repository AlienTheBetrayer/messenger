'use client';

import { useCallback } from 'react';

import type { AuthFormVariantsType } from '@/features/auth/lib/variants';
import type { AuthFormData } from '@/features/auth/lib/zod';

import { AuthFormProvider } from '@/features/auth/providers/AuthFormProvider';
import { AuthFormContent } from '@/features/auth/ui/AuthFormContent';
import { AuthFormFooter } from '@/features/auth/ui/AuthFormFooter';
import { AuthFormHeader } from '@/features/auth/ui/AuthFormHeader';
import { Card } from '@/shared/ui';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthForm = ({ type }: Props) => {
	// subbmitting fn
	const onSubmit = useCallback(
		(data: AuthFormData) => {
			if (type === 'login') {
				console.warn(data.email);
			} else {
				console.warn(data.password);
			}
		},
		[type],
	);

	// jsx
	return (
		<Card className="w-full max-w-sm">
			<AuthFormProvider onSubmit={onSubmit}>
				<AuthFormHeader type={type} />
				<AuthFormContent />
				<AuthFormFooter type={type} />
			</AuthFormProvider>
		</Card>
	);
};
