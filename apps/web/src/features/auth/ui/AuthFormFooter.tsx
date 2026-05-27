import Image from 'next/image';

import {
	type AuthFormVariantsType,
	AuthFormVariants,
} from '@/features/auth/lib/variants';
import { CardFooter, Button, Input, useQueryState } from '@/shared';
import { useFormContext } from 'react-hook-form';
import { AuthSchema } from '@gravity/shared';
import { useCallback, useState } from 'react';
import axios from 'axios';

type Props = {
	type: AuthFormVariantsType;
};

export const AuthFormFooter = ({ type }: Props) => {
	// states
	const [step, setStep] = useQueryState('step');
	const [code, setCode] = useState<string>('');

	// consuming provider
	const form = useFormContext<AuthSchema>();

  // jsx variants
	const variant = AuthFormVariants[type];

	const submitVerification = useCallback(async () => {
		const values = form.getValues();
		await axios.post(
			'/api/auth/signup',
			{ email: values.email, password: values.password },
			{
				params: {
					code,
				},
			},
		);
	}, [form, code]);

	// jsx
	return (
		<CardFooter className='flex-col gap-2'>
			<Button
				type='submit'
				className='w-full'
				form='auth-form'
				disabled={step === 'verify'}
			>
				{variant.buttonText}
			</Button>
			<Button
				type='button'
				variant='secondary'
				className='w-full'
				disabled={step === 'verify'}
			>
				<Image alt='' src='/google.svg' width={14} height={14} />
				{variant.buttonText} with Google
			</Button>

			<div
				className='grid w-full transition-all duration-300 -mt-2'
				style={{ gridTemplateRows: step === 'verify' ? '1fr' : '0fr' }}
			>
				<div className='flex flex-col gap-2 min-h-0'>
          <Input
						placeholder='******'
						className='mt-8 shrink-0'
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<Button
						type='button'
						variant='secondary'
						onClick={submitVerification}
					>
						Verify
					</Button>
				</div>
			</div>
		</CardFooter>
	);
};
