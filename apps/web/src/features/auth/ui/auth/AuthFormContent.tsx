import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardContent,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
} from "@/shared";

export const AuthFormContent = () => {
	// states
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const { authForm } = useAuthFormProvider();

	// ui states
	const passwordInputType = passwordVisible ? "text" : "password";

	// jsx
	return (
		<CardContent>
			<FieldGroup>
				<Controller
					name="email"
					control={authForm.control}
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
					control={authForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex items-center justify-between w-full">
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Button
									variant="link"
									asChild
								>
									<Link href="forgot-password">Forgot password?</Link>
								</Button>
							</div>

							<div className="relative flex items-center justify-between w-full">
								<Input
									{...field}
									id="password"
									type={passwordInputType}
									aria-invalid={fieldState.invalid}
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
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
		</CardContent>
	);
};
