"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { DraggableTrigger } from "@/shared/ui/custom/DraggableTrigger";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog";

export const InterceptionDialog = ({
	children,
	title,
	description,
}: {
	children: React.ReactNode;
	title: string;
	description: string;
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
				className="flex flex-col gap-5 w-screen max-w-lg"
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
