import { useAuthFormProvider } from "@/features/auth/providers/AuthFormProvider";
import {
	Button,
	CardContent,
	Field,
	FieldError,
	FieldLabel,
	Input,
} from "@/shared";
import { Controller } from "react-hook-form";

export const VerifyFormContent = () => {
	const { verifyForm } = useAuthFormProvider();

	// jsx
	return (
		<CardContent className="flex flex-col gap-2">
			<Controller
				name="code"
				control={verifyForm.control}
				render={({ field, fieldState, formState }) => (
					<Field data-invalid={fieldState.error}>
						<FieldLabel htmlFor="code">Code</FieldLabel>
						<Input
							{...field}
							id="code"
							type="text"
							placeholder="######"
						/>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</CardContent>
	);
};
