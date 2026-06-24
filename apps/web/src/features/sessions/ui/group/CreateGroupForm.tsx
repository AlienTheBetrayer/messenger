import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";

import { useGroupLogic } from "@/features/sessions/hooks/useGroupLogic";
import { useGroupFormProvider } from "@/features/sessions/providers/GroupFormProvider";
import {
	Button,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
} from "@/shared";

export const CreateGroupForm = () => {
	// states
	const { groupForm } = useGroupFormProvider();
	const { createGroup } = useGroupLogic();

	// jsx
	return (
		<form
			noValidate
			id="group-form"
			className="flex flex-col gap-4"
			onSubmit={groupForm.handleSubmit(createGroup)}
		>
			<CardHeader>
				<CardTitle className="text-xs">Group creation</CardTitle>
				<CardDescription className="text-xs">
					This will create a group that can link multiple sessions.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<FieldGroup>
					<Controller
						name="title"
						control={groupForm.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={fieldState.invalid}
								className="*:text-xs"
							>
								<FieldLabel htmlFor="title">Title</FieldLabel>
								<Input
									className="placeholder:text-xs"
									{...field}
									id="title"
									placeholder="Title"
									aria-invalid={fieldState.invalid}
								/>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					size="sm"
				>
					<Plus />
					Create
				</Button>
			</CardFooter>
		</form>
	);
};
