import { Controller } from "react-hook-form";

import { useConnectionActions } from "@/features/connections/hooks/useConnectionActions";
import { useConnectionVerificationFormProvider } from "@/features/connections/providers/ConnectionVerificationFormProvider";
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
	queryStateHooks,
} from "@/shared";

export const ConnectionVerificationForm = () => {
	// states
	const forms = useConnectionVerificationFormProvider();
	const [id, setId] = queryStateHooks.useId();
	const [, setConnection] = queryStateHooks.useConnection();

	// actions
	const { loginConnection } = useConnectionActions();

	// jsx
	return (
		<form
			noValidate
			id="connection-verify-form"
			onSubmit={forms.connectionVerificationForm.handleSubmit((data) => {
				if (!id) {
					return;
				}

				loginConnection({ ...data, connectionId: id });
				setConnection(null);
				setId(null);
			})}
		>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Verify the connection</DialogTitle>
					<DialogDescription>
						Use the code that has been sent to the email of the owner.
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
