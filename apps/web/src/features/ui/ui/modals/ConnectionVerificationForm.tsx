import { Controller } from "react-hook-form";

import { useConnectionVerificationActions } from "@/features/ui/hooks/useConnectionVerificationActions";
import { useConnectionVerificationFormProvider } from "@/features/ui/providers/ConnectionVerificationFormProvider";
import {
	Button,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
} from "@/shared";

export const ConnectionVerificationForm = () => {
	// forms
	const forms = useConnectionVerificationFormProvider();
	const { verify } = useConnectionVerificationActions();

	// jsx
	return (
		<form
			noValidate
			id="connection-verify-form"
			onSubmit={forms.connectionVerificationForm.handleSubmit(verify)}
		>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Verify connection</DialogTitle>
					<DialogDescription>
						Use the code that has been sent to your email to connect as the
						owner.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Controller
						name="code"
						control={forms.connectionVerificationForm.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="code">Code</FieldLabel>

								<Input
									{...field}
									id="code"
									aria-invalid={fieldState.invalid}
									placeholder="••••••"
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant="outline"
							type="button"
						>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="submit"
						form="connection-verify-form"
					>
						Connect
					</Button>
				</DialogFooter>
			</DialogContent>
		</form>
	);
};
