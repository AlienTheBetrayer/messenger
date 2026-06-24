import { Field, FieldGroup, Input, Label } from "@/shared";

export const ProfileDialogContent = () => {
	return (
		<FieldGroup>
			<Field>
				<Label htmlFor="name-1">Name</Label>
				<Input
					id="name-1"
					name="name"
					defaultValue="Pedro Duarte"
				/>
			</Field>
			<Field>
				<Label htmlFor="username-1">Username</Label>
				<Input
					id="username-1"
					name="username"
					defaultValue="@peduarte"
				/>
			</Field>
		</FieldGroup>
	);
};
