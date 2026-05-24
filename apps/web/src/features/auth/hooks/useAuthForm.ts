import { authSchema, type AuthSchema } from '@gravity/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const useAuthForm = () => {
	// validated form
	const form = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
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
