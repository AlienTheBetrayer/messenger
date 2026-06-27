import { Pencil, Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { useGroupActions } from "@/features/connections/hooks/useGroupActions";
import { randomGroupFormEmoji } from "@/features/connections/lib/emojis";
import { groupSelectors } from "@/features/connections/model/sessionGroup.api";
import { useGroupFormProvider } from "@/features/connections/providers/GroupFormProvider";
import { CreateGroupPopoverParams } from "@/features/connections/ui/group/CreateGroupFormPopover";
import {
	Button,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useAppSelector,
} from "@/shared";

export const CreateGroupForm = ({
	onSuccess,
	params,
}: {
	onSuccess: () => void;
	params?: CreateGroupPopoverParams;
}) => {
	// states
	const { groupForm } = useGroupFormProvider();
	const { createGroup, editGroup } = useGroupActions();
	const [open, setOpen] = useState<boolean>(false);

	// redux
	const group = useAppSelector((state) =>
		groupSelectors.selectById(
			state,
			params?.type === "edit" ? params.groupId : "",
		),
	);

	// sync the form with the group if the mode is edit
	useEffect(() => {
		if (!group) {
			return;
		}

		groupForm.setValues({
			title: group.title,
			emoji: group.emoji ?? undefined,
		});
	}, [group, groupForm]);

	// jsx
	return (
		<form
			noValidate
			id="group-form"
			className="flex flex-col gap-4"
			onSubmit={groupForm.handleSubmit((data) => {
				onSuccess();

				switch (params?.type) {
					case "edit": {
						editGroup({ groupId: params.groupId, ...data });
						break;
					}
					default: {
						createGroup(data);
						break;
					}
				}
			})}
		>
			<CardHeader>
				<CardTitle className="text-xs">
					Group {params?.type === "edit" ? "editing" : "creation"}
				</CardTitle>
				<CardDescription className="text-xs">
					{params?.type === "edit"
						? "This will update the group."
						: "This will create a group that can link multiple sessions."}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<FieldGroup className="grid grid-cols-[auto_1fr] gap-2">
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

					<Controller
						name="emoji"
						control={groupForm.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={fieldState.invalid}
								className="*:text-xs"
							>
								<FieldLabel htmlFor="title">Emoji</FieldLabel>
								<Popover
									onOpenChange={setOpen}
									open={open}
								>
									<PopoverTrigger asChild>
										<Button
											type="button"
											variant="secondary"
											className="flex justify-center aspect-square items-center"
										>
											<span>{field.value}</span>
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-fit p-0">
										<EmojiPicker
											sticky={false}
											className="h-[200px]"
											onEmojiSelect={({ emoji }) => {
												field.onChange(emoji);
												setOpen(false);
											}}
										>
											<EmojiPickerSearch />
											<EmojiPickerContent />
											<EmojiPickerFooter />
										</EmojiPicker>
									</PopoverContent>
								</Popover>

								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</CardContent>

			<CardFooter className="flex justify-end items-center gap-2">
				<Button
					type="button"
					size="sm"
					variant="secondary"
					className="aspect-square"
					onClick={() => {
						groupForm.setValues({
							title: "",
							emoji: randomGroupFormEmoji(),
						});
					}}
				>
					<RotateCcw />
				</Button>

				<Button
					type="submit"
					size="sm"
					className="min-w-1/3"
				>
					{params?.type === "edit" ? (
						<>
							<Pencil />
							<span>Edit</span>
						</>
					) : (
						<>
							<Plus />
							<span>Create</span>
						</>
					)}
				</Button>
			</CardFooter>
		</form>
	);
};
