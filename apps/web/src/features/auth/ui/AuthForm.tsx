'use client';

import axios from 'axios';
import { useCallback } from 'react';

import type { AuthFormVariantsType } from '@/features/auth/lib/variants';
import type { AuthSchema } from '@gravity/shared';

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
	const onSubmit = useCallback((data: AuthSchema) => {
		axios
			.post('/api/auth/register', data)
			.then((res) => {
				console.warn(res.data);
			})
			.catch((err: unknown) => {
				console.error(err);
			});
	}, []);

	// jsx
	return (
		<Card className='w-full max-w-sm'>
			<AuthFormProvider onSubmit={onSubmit}>
				<AuthFormHeader type={type} />
				<AuthFormContent />
				<AuthFormFooter type={type} />
			</AuthFormProvider>
		</Card>
	);
};
