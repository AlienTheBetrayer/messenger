"use client";

import { Grip } from "lucide-react";

import { cn } from "@/features/ui";
import { useDraggable } from "@/shared/hooks/useDraggable";
import { Button, ButtonProps } from "@/shared/ui/button";

export const DraggableTrigger = <T extends HTMLElement | null>({
	children,
	ref,
	props,
}: {
	children?: React.ReactNode;
	ref: React.RefObject<T>;
	props?: ButtonProps;
}) => {
	// states
	const { grabbing, onPointerDown: pointerDown } = useDraggable(ref);
	const { onPointerDown, onPointerUp, className, ...restProps } = props ?? {};

	// jsx
	return (
		<Button
			className={cn("cursor-grab active:cursor-grabbing", className ?? "")}
			onPointerDown={(e) => {
				onPointerDown?.(e);
				pointerDown(e);
			}}
			variant="ghost"
			size="icon-sm"
			aria-label="draggable"
			{...restProps}
		>
			{children ?? <Grip />}
		</Button>
	);
};
