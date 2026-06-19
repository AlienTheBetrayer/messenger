"use client";

import * as React from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/shared/ui";
import { Spinner } from "@/shared/ui/spinner"; // Assuming this exists

export const MessageBox = ({
	children,
	title,
	description,
	actionText,
	onConfirm,
	icon,
	variant = "default",
	isLoading = false,
}: {
	children: React.ReactNode;
	title: string;
	description: React.ReactNode;
	actionText: string;
	onConfirm: () => Promise<void> | void;
	icon?: React.ReactNode;
	variant?: "destructive" | "default";
	isLoading?: boolean;
}) => {
	const [open, setOpen] = React.useState(false);

	const handleConfirm = async () => {
		await onConfirm();
		setOpen(false);
	};

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					{icon && (
						<AlertDialogMedia
							className={
								variant === "destructive"
									? "bg-destructive/10 text-destructive dark:bg-destructive/20"
									: "bg-muted text-muted-foreground"
							}
						>
							{icon}
						</AlertDialogMedia>
					)}
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel
						disabled={isLoading}
						variant="secondary"
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isLoading}
						variant={variant}
						onClick={(e) => {
							e.preventDefault();
							handleConfirm();
						}}
					>
						{isLoading ? <Spinner className="size-4" /> : actionText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

MessageBox.displayName = "MessageBox";
