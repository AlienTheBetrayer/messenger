import { X } from "lucide-react";

import {
	Button,
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/shared";

export const ProfileDialogHeader = () => {
	return (
		<DialogHeader>
			<DialogTitle>Profile display</DialogTitle>
			<DialogDescription>
				You can see how your profile looks here. Reload to edit.
			</DialogDescription>

			<Tooltip>
				<TooltipTrigger asChild>
					<DialogClose asChild>
						<Button
							variant="ghost"
							type="button"
							className="aspect-square absolute! top-2 right-2"
							size="icon-sm"
						>
							<X />
						</Button>
					</DialogClose>
				</TooltipTrigger>

				<TooltipContent>
					<span>Go back</span>
				</TooltipContent>
			</Tooltip>
		</DialogHeader>
	);
};
