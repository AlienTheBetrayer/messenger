import { authSchema, type AuthSchema } from '@gravity/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { transformError } from '@/shared';

export const useAuthForm = () => {
	// validated form
	const form = useForm<AuthSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// subbmitting fn
	const onSubmit = useCallback(async (data: AuthSchema) => {
		try {
			await axios.post('/api/auth/signup', data);
		} catch (e: unknown) {
			// transformed error message
			const message = transformError(e);

			// updating form's ui
			form.setError('email', { message });
		}
	}, []);

	// return
	return useMemo(() => ({ form, onSubmit }), [form, onSubmit]);
};
