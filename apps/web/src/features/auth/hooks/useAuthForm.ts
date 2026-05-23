import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { type AuthFormData, authFormSchema } from '@/features/auth/lib/zod';

export const useAuthForm = () => {
	// validated form
	const form = useForm<AuthFormData>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// return
	return useMemo(() => {
		return form;
	}, [form]);
};
