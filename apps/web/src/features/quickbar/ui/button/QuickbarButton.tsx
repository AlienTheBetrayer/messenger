"use client";

import { cn } from "@/features/ui";
import {
	Button,
	ButtonProps,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/shared";

export const QuickbarButton = ({
	children,
	tooltip,
	buttonProps,
}: {
	children: React.ReactNode;
	tooltip: string;
	buttonProps?: ButtonProps;
}) => {
	// ui states
	const { className, ...props } = buttonProps ?? {};

	// jsx
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					className={cn("w-full h-full not-hover:bg-muted/75", className ?? "")}
					variant="ghost"
					{...props}
				>
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="right">
				<span>{tooltip}</span>
			</TooltipContent>
		</Tooltip>
	);
};
