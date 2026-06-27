"use client";

import { LucideUserRoundPlus } from "lucide-react";
import { useCallback, useRef } from "react";
import Draggable from "react-draggable";

import {
	Icons,
	selectConnectSessionsAwaitingGroupId,
	setConnectSessionsAwaitingGroupId,
} from "@/features/ui";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	useAppDispatch,
	useAppSelector,
} from "@/shared";

export const AuthSessionAddPopup = () => {
	// redux
	const isVisible = !!useAppSelector((state) =>
		selectConnectSessionsAwaitingGroupId(state),
	);
	const dispatch = useAppDispatch();
	const onExit = useCallback(() => {
		dispatch(setConnectSessionsAwaitingGroupId(undefined));
	}, [dispatch]);

	// refs
	const draggableContainerRef = useRef<HTMLDivElement | null>(null);

	// jsx
	return (
		<Dialog
			modal={false}
			open={isVisible}
		>
			<DialogContent
				showCloseButton={false}
				className="fixed top-7 left-1/2 -translate-x-1/2 p-0 w-0 items-center flex justify-center"
				onPointerDownOutside={(e) => {
					e.preventDefault();
				}}
				onEscapeKeyDown={(e) => {
					e.preventDefault();
				}}
			>
				<Draggable
					nodeRef={draggableContainerRef}
					handle=".drag-handle"
				>
					<div
						ref={draggableContainerRef}
						className="fixed shadowed pointer-events-auto py-2 px-4 bg-card rounded-2xl flex flex-col gap-2 w-screen max-w-64!"
					>
						<DialogHeader className="flex flex-row items-center justify-between drag-handle cursor-grab active:cursor-grabbing select-none">
							<div className="flex items-center gap-2 text-primary">
								<div className="flex size-7 items-center justify-center rounded-md bg-primary/6">
									<LucideUserRoundPlus className="h-4 w-4" />
								</div>
								<DialogTitle className="text-xs flex items-center gap-1">
									Connection mode
									<span className="relative flex h-1.5 w-1.5">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
										<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
									</span>
								</DialogTitle>
							</div>

							<DialogClose asChild>
								<Button
									variant="destructive"
									size="icon-sm"
									onClick={onExit}
								>
									{Icons.close}
								</Button>
							</DialogClose>
						</DialogHeader>
					</div>
				</Draggable>
			</DialogContent>
		</Dialog>
	);
};
