import { useState } from "react";

import { GroupFormProvider } from "@/features/sessions/providers/GroupFormProvider";
import { CreateGroupForm } from "@/features/sessions/ui/group/CreateGroupForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared";

export const CreateGroupPopover = ({
	children,
}: {
	children: React.ReactNode;
}) => {
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
						onSuccess={() => {
							setOpen(false);
						}}
					/>
				</GroupFormProvider>
			</PopoverContent>
		</Popover>
	);
};
