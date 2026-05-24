import z from 'zod';

export const authSchema = z.object({
	email: z.email('Please enter a valid email address.'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters.')
		.max(32, 'Password must be at most 32 characters.'),
});

export type AuthSchema = z.infer<typeof authSchema>;
