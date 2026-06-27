import { useState } from "react";

import { CreateGroupForm } from "@/features/connections/ui/group/CreateGroupForm";
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
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent>
				<CreateGroupForm
					onSuccess={() => {
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};
