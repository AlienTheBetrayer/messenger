import { useGroupLogic } from "@/features/sessions/hooks/useGroupLogic";
import { useGroupFormProvider } from "@/features/sessions/providers/GroupFormProvider";
import {
	Button,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
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
			className="flex flex-col gap-5"
			onSubmit={groupForm.handleSubmit(createGroup)}
		>
			<CardHeader>
				<CardTitle>Group creation</CardTitle>
				<CardDescription>
					This will create a group that can link multiple sessions.
				</CardDescription>

				<CardAction>
					<Button />
				</CardAction>
			</CardHeader>
		</form>
	);
};
