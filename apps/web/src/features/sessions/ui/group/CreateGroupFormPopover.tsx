import { CreateGroupForm } from "@/features/sessions/ui/group/CreateGroupForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared";

export const CreateGroupPopover = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Popover modal>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align="end" className="shadowed-xl p-0! pt-4!">
				<CreateGroupForm />
			</PopoverContent>
		</Popover>
	);
};
