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
	// states
	const { verifyForm } = useAuthFormProvider();

	// jsx
	return (
		<CardContent className="flex flex-col gap-2">
			<Controller
				name="code"
				control={verifyForm.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.error}>
						<FieldLabel htmlFor="code">Code</FieldLabel>
						<FieldDescription>
							This code will expire in ${AuthConfig.code.expiryMs / (60 * 1000)}{" "}
							minutes.
						</FieldDescription>
						<Input
							{...field}
							id="code"
							type="text"
							aria-invalid={fieldState.invalid}
							placeholder={String().padStart(AuthConfig.code.length, "0")}
						/>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</CardContent>
	);
};
