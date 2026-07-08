"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/features/ui";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog";

export const InterceptionDialog = ({
	children,
	title,
	description,
	className,
}: {
	children: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}) => {
	// routing
	const router = useRouter();
	const pathname = usePathname();

	// refs
	const initialPathname = useRef<string>(pathname);
	const redirectingBack = useRef<boolean>(true);

	// states
	const [open, setOpen] = useState<boolean>(true);

	// routing
	useEffect(() => {
		if (pathname !== initialPathname.current) {
			redirectingBack.current = false;
			setOpen(false);
		}
	}, [pathname]);

	// jsx
	return (
		<Dialog
			open={open}
			onOpenChange={(state) => {
				if (!state) {
					setOpen(false);

					if (redirectingBack.current) {
						setTimeout(() => {
							router.back();
						}, 300);
					}
				}
			}}
		>
			<DialogContent
				className={cn("flex flex-col gap-5 w-screen max-w-lg shadowed bg-card/30", className ?? "")}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
        {children}
        
			</DialogContent>
		</Dialog>
	);
};
