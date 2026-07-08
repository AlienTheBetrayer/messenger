"use client";

import { cn } from "@/features/ui/lib";
import { AuthButtons } from "@/features/ui/ui/header/AuthButtons";

export const Authentication = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex", className ?? "")}>
			<AuthButtons />
		</div>
	);
};
