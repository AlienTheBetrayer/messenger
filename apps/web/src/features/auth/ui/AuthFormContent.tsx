import { AuthFormData } from '@/features/auth/lib/zod';
import { Button, CardContent, Input } from '@/shared/ui';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import Link from 'next/link';
import { Controller, useFormContext } from 'react-hook-form';

export const AuthFormContent = () => {
	// consuming provider
	const form = useFormContext<AuthFormData>();

	// jsx
	return (
		<CardContent>
			<FieldGroup>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								{...field}
								id="email"
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="m@example.com"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex items-center justify-between w-full">
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Button variant="link" asChild>
									<Link href="forgot-password">Forgot password?</Link>
								</Button>
							</div>
							<Input
								{...field}
								id="password"
								type="password"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</CardContent>
	);
};
