import { FormProvider } from 'react-hook-form';

import type { AuthFormData } from '@/features/auth/lib/zod';

import { useAuthForm } from '@/features/auth/hooks/useAuthForm';

type Props = {
	children: React.ReactNode;
	onSubmit: (data: AuthFormData) => void;
};

export const AuthFormProvider = ({ children, onSubmit }: Props) => {
	// form
	const form = useAuthForm();

	// jsx
	return (
		<FormProvider {...form}>
			<form
				id="auth-form"
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				{children}
			</form>
		</FormProvider>
	);
};
