import { AuthConfig } from "@gravity/shared";
import { Controller } from "react-hook-form";

import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	CardContent,
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
	Input,
} from "@/shared";

export const VerifyContent = () => {
	const { verifyForm } = useAuthFormProvider();

	return (
		<CardContent className="p-0">
			<Controller
				name="code"
				control={verifyForm.control}
				render={({ field, fieldState }) => (
					<Field
						data-invalid={fieldState.error}
						className="w-full"
					>
						<div className="flex items-center justify-between w-full mb-1">
							<FieldLabel
								htmlFor="code"
								className="text-xs font-semibold text-foreground/90 tracking-tight"
							>
                Verification code
							</FieldLabel>

							<FieldDescription className="text-[10px] font-mono font-medium text-amber-500/80 px-1.5 py-0.5 border border-amber-500/10 bg-amber-500/5 rounded">
								Expires in {AuthConfig.code.expiryMs / (60 * 1000)}m
							</FieldDescription>
						</div>

						<div className="relative">
							<Input
								{...field}
								id="code"
								type="text"
								autoComplete="one-time-code"
								aria-invalid={fieldState.invalid}
								placeholder={String().padStart(AuthConfig.code.length, "0")}
								className="h-10 text-sm font-mono tracking-[0.4em] text-center placeholder:opacity-30 placeholder:tracking-[0.4em] font-bold border-border/50 bg-background focus-visible:ring-primary/20 uppercase"
							/>
							{fieldState.error && (
								<FieldError
									errors={[fieldState.error]}
									className="mt-1.5 text-xs text-destructive"
								/>
							)}
						</div>
					</Field>
				)}
			/>
		</CardContent>
	);
};
