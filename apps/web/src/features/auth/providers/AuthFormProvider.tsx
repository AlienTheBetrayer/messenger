import { FormProvider } from 'react-hook-form';

import { useAuthForm } from '@/features/auth/hooks/useAuthForm';

type Props = {
	children: React.ReactNode;
};

export const AuthFormProvider = ({ children }: Props) => {
	// form
	const { form, onSubmit } = useAuthForm();

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
