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
		<CardContent className="p-0">
			<FieldGroup className="gap-5 w-full">
				<Controller
					name="email"
					disabled={verify === "pending"}
					control={authForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex flex-col gap-2">
								<FieldLabel
									htmlFor="email"
									className="text-xs font-semibold text-foreground/90 tracking-tight"
								>
									Email address
								</FieldLabel>

								{variant.elements.email.description && (
									<FieldDescription className="text-[11px] text-foreground/50 px-1.5 py-0.5  rounded">
										{variant.elements.email.description}
									</FieldDescription>
								)}
							</div>

							<div className="relative">
								<Input
									{...field}
									id="email"
									type="email"
									autoComplete="email"
									aria-invalid={fieldState.invalid}
									placeholder="m@email.com"
									className="h-10 text-sm border-border/50 bg-background focus-visible:ring-primary/20"
								/>

								{fieldState.invalid && (
									<FieldError
										errors={[fieldState.error]}
										className="mt-1.5 text-xs text-destructive"
									/>
								)}
							</div>
						</Field>
					)}
				/>

				<Controller
					name="password"
					control={authForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex items-center justify-between w-full">
								<div className="flex flex-col gap-2">
									<FieldLabel
										htmlFor="password"
										className="text-xs font-semibold text-foreground/90 tracking-tight"
									>
										Account password
									</FieldLabel>

									{variant.elements.password.description && (
										<FieldDescription className="text-[11px] text-foreground/50 px-1.5 py-0.5  rounded">
											{variant.elements.password.description}
										</FieldDescription>
									)}
								</div>

								{type !== "forgot_password" && (
									<Button
										variant="link"
										type="button"
										asChild
										className="px-0 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
									>
										<Link href="/forgot-password">Recover</Link>
									</Button>
								)}
							</div>

							<div>
								<div className="relative">
									<Input
										{...field}
										id="password"
										autoComplete="current-password"
										type={passwordInputType}
										aria-invalid={fieldState.invalid}
										placeholder="••••••"
										className="h-10 text-sm border-border/50 bg-background focus-visible:ring-primary/20 pr-10"
									/>

									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="size-7 p-0 absolute right-1.5 top-1/2 -translate-y-1/2! text-muted-foreground/60 hover:text-foreground hover:bg-muted"
										onClick={() => {
											setPasswordVisible((prev) => !prev);
										}}
									>
										<span className="*:size-3.5 flex items-center justify-center">
											{passwordVisible ? Icons.eyeShown : Icons.eyeHidden}
										</span>
									</Button>
								</div>

								{fieldState.invalid && (
									<FieldError
										errors={[fieldState.error]}
										className="mt-1.5 text-xs text-destructive"
									/>
								)}
							</div>
						</Field>
					)}
				/>
			</FieldGroup>
		</CardContent>
	);
};
