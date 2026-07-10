"use client";

import { cn } from "@/features/ui";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog";

export const DialogWrapper = ({
	title,
	description,
	children,
	content,
	className,
	open,
	onOpenChange,
}: {
	title: string;
	description: string;
	className?: string;
	content: React.ReactNode;
	children?: React.ReactNode;
	open: boolean;
	onOpenChange: (state: boolean) => void;
}) => {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}

			<DialogContent
				className={cn("w-screen max-w-2xl bg-card/30", className ?? "")}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{content}
			</DialogContent>
		</Dialog>
	);
};
