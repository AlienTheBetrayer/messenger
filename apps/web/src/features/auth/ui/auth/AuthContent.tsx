import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { AuthFormVariants } from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import { Icons } from "@/features/ui/lib";
import {
	Button,
	CardContent,
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	queryStateHooks,
} from "@/shared";

export const AuthContent = () => {
	// states
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [verify] = queryStateHooks.useVerify();
	const { type, authForm } = useAuthFormProvider();

	// ui states
	const passwordInputType = passwordVisible ? "text" : "password";
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardContent>
			<FieldGroup>
				<Controller
					name="email"
					control={authForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex items-center justify-between w-full">
								<FieldLabel htmlFor="email">Email</FieldLabel>
							</div>

							{variant.elements.email.description && (
								<FieldDescription className="text-sm">
									{variant.elements.email.description}
								</FieldDescription>
							)}

							<Input
								{...field}
								id="email"
								type="email"
								autoComplete="email"
								aria-invalid={fieldState.invalid}
								placeholder="m@gmail.com"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="password"
					control={authForm.control}
					render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
							<div className="flex items-center justify-between w-full">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                {type !== "forgot_password" && (

                  <Button
                    variant="link"
                    type="button"
                    asChild
                  >
                    <Link href="/forgot-password">Forgot password?</Link>
                  </Button>
                )}
							</div>

							{variant.elements.password.description && (
								<FieldDescription className="text-sm">
									{variant.elements.password.description}
								</FieldDescription>
							)}

							<div className="relative flex items-center justify-between w-full">
								<Input
									{...field}
									id="password"
									autoComplete="current-password"
									type={passwordInputType}
									aria-invalid={fieldState.invalid}
									placeholder="••••••"
								/>

								<Button
									type="button"
									variant="ghost"
									className="w-6 h-6 p-0! absolute! right-2 top-1/2 -translate-y-1/2!"
									onClick={() => {
										setPasswordVisible((prev) => !prev);
									}}
								>
									<span className="*:size-4!">
										{passwordVisible ? Icons.eyeShown : Icons.eyeHidden}
									</span>
								</Button>
							</div>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</CardContent>
	);
};
