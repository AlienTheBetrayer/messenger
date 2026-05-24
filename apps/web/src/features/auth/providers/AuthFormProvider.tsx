import { FormProvider } from 'react-hook-form';

import type { AuthSchema } from '@gravity/shared';

import { useAuthForm } from '@/features/auth/hooks/useAuthForm';

type Props = {
	children: React.ReactNode;
	onSubmit: (data: AuthSchema) => void;
};

export const AuthFormProvider = ({ children, onSubmit }: Props) => {
	// form
	const form = useAuthForm();

	// jsx
	return (
		<FormProvider {...form}>
			<form
				noValidate
				id='auth-form'
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5'
			>
				{children}
			</form>
		</FormProvider>
	);
};
