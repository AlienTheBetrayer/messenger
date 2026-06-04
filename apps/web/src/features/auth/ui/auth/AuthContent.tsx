/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";

import {
	AuthFormVariants,
	AuthFormVariantsType,
} from "@/features/auth/lib/variants";
import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardContent,
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
} from "@/shared";
import { useQueryStateHooks } from "@/shared/hooks/queryStates";

type Props = {
	type: AuthFormVariantsType;
};

export const AuthContent = ({ type }: Props) => {
	// states
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [verify] = useQueryStateHooks.verify();
	const { authForm } = useAuthFormProvider();

	// ui states
	const passwordInputType = passwordVisible ? "text" : "password";
	const variant = AuthFormVariants[type];

	// jsx
	return (
		<CardContent>
			<FieldGroup>
				{variant.elements.email.enabled && (
					<Controller
						name="email"
						disabled={!!verify}
						control={authForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-center justify-between w-full">
									<FieldLabel htmlFor="email">Email</FieldLabel>
								</div>

								{variant.elements.email.description && (
									<FieldDescription>
										{variant.elements.email.description}
									</FieldDescription>
								)}

								<Input
									{...field}
									id="email"
									type="email"
									aria-invalid={fieldState.invalid}
									placeholder={variant.elements.email.placeholder}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				)}

				{variant.elements.password.enabled && (
					<Controller
						name="password"
						control={authForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<div className="flex items-center justify-between w-full">
									<FieldLabel htmlFor="password">Password</FieldLabel>

									{variant.elements.forgotButtons.enabled && (
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
									<FieldDescription>
										{variant.elements.password.description}
									</FieldDescription>
								)}

								<div className="relative flex items-center justify-between w-full">
									<Input
										{...field}
										id="password"
										type={passwordInputType}
										aria-invalid={fieldState.invalid}
										placeholder={variant.elements.password.placeholder}
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
											{passwordVisible ? <Eye /> : <EyeOff />}
										</span>
									</Button>
								</div>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				)}
			</FieldGroup>
		</CardContent>
	);
};
