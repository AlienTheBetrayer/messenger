'use client';

import { Card } from '@/shared/ui';
import { AuthFormData } from '@/features/auth/lib/zod';
import { AuthFormVariantsType } from '@/features/auth/lib/variants';
import { useCallback } from 'react';
import { AuthFormHeader } from '@/features/auth/ui/AuthFormHeader';
import { AuthFormFooter } from '@/features/auth/ui/AuthFormFooter';
import { AuthFormProvider } from '@/features/auth/providers/AuthFormProvider';
import { AuthFormContent } from '@/features/auth/ui/AuthFormContent';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthForm = ({ type }: Props) => {
	// subbmitting fn
	const onSubmit = useCallback((data: AuthFormData) => {
		alert(data.email);
	}, []);

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
