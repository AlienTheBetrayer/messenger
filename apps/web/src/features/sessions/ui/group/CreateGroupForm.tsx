import { Plus } from "lucide-react";
import { useState } from "react";
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
} from "@/shared";

export const CreateGroupForm = ({ onSuccess }: { onSuccess: () => void }) => {
	// states
	const { groupForm } = useGroupFormProvider();
	const { createGroup } = useGroupLogic();
	const [open, setOpen] = useState<boolean>(false);

	// jsx
	return (
		<form
			noValidate
			id="group-form"
			className="flex flex-col gap-4"
			onSubmit={groupForm.handleSubmit((data) => {
				createGroup(data);
				onSuccess();
			})}
		>
			<CardHeader>
				<CardTitle className="text-xs">Group creation</CardTitle>
				<CardDescription className="text-xs">
					This will create a group that can link multiple sessions.
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

			<CardFooter className="flex justify-end items-center">
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
