import { CreateGroupForm } from "@/features/sessions/ui/creategroup/CreateGroupForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared";

export const CreateGroupPopover = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent>
				<CreateGroupForm />
			</PopoverContent>
		</Popover>
	);
};
