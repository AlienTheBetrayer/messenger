"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/features/ui";
import { selectInterceptionRoutes } from "@/features/ui/model/ui.selectors";
import { uiSlice } from "@/features/ui/model/ui.slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/redux.hooks";
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
	className,
	href,
}: {
	children: React.ReactNode;
	title: string;
	description: string;
	className?: string;
	href?: string;
}) => {
	// redux
	const dispatch = useAppDispatch();
	const routes = useAppSelector((state) => selectInterceptionRoutes(state));

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

	useEffect(() => {
		dispatch(uiSlice.actions.setIsIntercepting(true));
	}, [dispatch]);

	// jsx
	return (
		<Dialog
			open={open}
			onOpenChange={(state) => {
				if (!state) {
					setOpen(false);

					if (redirectingBack.current) {
						setTimeout(() => {
							const link = routes.at(-2);
							dispatch(uiSlice.actions.setIsIntercepting(false));

							if (href) {
								router.push(href);
							}

							if (link) {
								router.push(link);
							}
						}, 300);
					}
				}
			}}
		>
			<DialogContent
				className={cn(
					"flex flex-col gap-5 w-screen max-w-lg bg-card/30",
					className ?? "",
				)}
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
