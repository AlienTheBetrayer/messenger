import { Controller } from "react-hook-form";

import { VerifyFormVariants } from "@/features/auth/lib/variants";
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
	// states
	const { verifyForm } = useAuthFormProvider();

	// ui states
	const variant = VerifyFormVariants;

	// jsx
	return (
		<CardContent className="flex flex-col gap-2">
			{variant.elements.code.enabled && (
				<Controller
					name="code"
					control={verifyForm.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.error}>
							<FieldLabel htmlFor="code">Code</FieldLabel>
							<FieldDescription>
								{variant.elements.code.description}
							</FieldDescription>
							<Input
								{...field}
								id="code"
								type="text"
								aria-invalid={fieldState.invalid}
								placeholder={variant.elements.code.placeholder}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)}
		</CardContent>
	);
};
