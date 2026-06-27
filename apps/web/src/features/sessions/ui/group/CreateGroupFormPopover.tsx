import { useState } from "react";

import { GroupFormProvider } from "@/features/sessions/providers/GroupFormProvider";
import { CreateGroupForm } from "@/features/sessions/ui/group/CreateGroupForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared";

/**
 * makes the create group form reusable for editing
 * type: create by default
 */
export type CreateGroupPopoverParams =
	| {
			type?: "create";
	  }
	| {
			type: "edit";
			groupId: string;
	  };

export const CreateGroupPopover = ({
	children,
	params,
}: {
	children: React.ReactNode;
} & { params?: CreateGroupPopoverParams }) => {
	// states
	const [open, setOpen] = useState<boolean>(false);

	// jsx
	return (
		<Popover
			modal
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align="end"
				className="shadowed p-0! pt-4!"
			>
				<GroupFormProvider>
					<CreateGroupForm
						params={params}
						onSuccess={() => {
							setOpen(false);
						}}
					/>
				</GroupFormProvider>
			</PopoverContent>
		</Popover>
	);
};
