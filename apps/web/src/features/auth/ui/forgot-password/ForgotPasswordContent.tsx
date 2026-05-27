import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
  CardContent,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@/shared";
import { CODE_EXPIRY_MS, CODE_LENGTH } from "@gravity/shared";
import { Controller } from "react-hook-form";

export const ForgotPasswordContent = () => {
  // states
  const { forgotPasswordForm } = useAuthFormProvider();

  // jsx
  return (
		<CardContent className="flex flex-col gap-2">
			<Controller
				name="email"
				control={forgotPasswordForm.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.error}>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input
							{...field}
							id="email"
							type="email"
							aria-invalid={fieldState.invalid}
							placeholder="m@example.com"
						/>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</CardContent>
	);
};
