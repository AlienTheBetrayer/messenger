"use client";

import { Boxes, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { connectionsApi } from "@/features/connections/model/connections.api";
import { CreateGroupPopover } from "@/features/connections/ui/group/CreateGroupFormPopover";
import { GroupList } from "@/features/connections/ui/group/GroupsList";
import { MiniProfileCube } from "@/features/connections/ui/other/MiniProfileCube";
import { cn } from "@/features/ui";
import { selectConnectSessionsCollapsedMenu } from "@/features/ui/model/local.selectors";
import { toggleConnectSessionsCollapsedMenu } from "@/features/ui/model/local.slice";
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/model/redux.hooks";

type Mode = "static" | "default";

export const Connections = ({
	mode,
	className,
	groupClassName,
}: {
	mode?: Mode;
	className?: string;
	groupClassName?: string;
}) => {
	return (
		<Card className={cn("p-0 gap-0", className ?? "")}>
			<ConnectionsDisplay
				mode={mode ?? "default"}
				groupClassName={groupClassName}
			/>
		</Card>
	);
};

const ConnectionsDisplay = ({
	mode,
	groupClassName,
}: {
	mode: Mode;
	groupClassName?: string;
}) => {
	// redux
	const dispatch = useAppDispatch();
	const prefetchConnections = connectionsApi.usePrefetch("getConnections");
	const collapsedMenu = useAppSelector((state) =>
		mode === "static" ? false : selectConnectSessionsCollapsedMenu(state),
	);
	const auth = useAuth();

	// jsx
	return (
		<>
			<CardContent className="fade-bottom p-0!">
				<AnimatePresence initial={false}>
					{!collapsedMenu && (
						<motion.div
							initial={{ height: 0 }}
							animate={{ height: "auto" }}
							exit={{ height: 0 }}
							className={cn(
								"max-h-42 scrollbar-none overflow-y-auto",
								groupClassName ?? "",
							)}
						>
							<GroupList />
						</motion.div>
					)}
				</AnimatePresence>
			</CardContent>

			<CardFooter
				className="flex items-center p-1 min-h-12"
				style={
					collapsedMenu
						? {
								borderRadius: "var(--radius)",
								borderTop: "0",
							}
						: {}
				}
			>
				<AnimatePresence initial={false}>
					{collapsedMenu && (
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "auto", opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							className="flex items-center justify-center overflow-hidden grow"
						>
							<MiniProfileCube
								userId={auth?.user.id ?? ""}
								props={{ size: "lg" }}
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<Tooltip open={mode === "static" ? false : undefined}>
					<TooltipTrigger asChild>
						<Button
							className={cn(
								"aspect-square ml-auto",
								mode === "static" && "opacity-30",
							)}
							variant="secondary"
							inert={mode === "static"}
							size="sm"
							onPointerDown={() => {
								if (collapsedMenu) {
									prefetchConnections();
								}
							}}
							onClick={() => {
								dispatch(toggleConnectSessionsCollapsedMenu());
							}}
						>
							<ChevronsUpDown />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<span>{collapsedMenu ? "Show" : "Hide"} menu (saves)</span>
					</TooltipContent>
				</Tooltip>

				<AnimatePresence initial={false}>
					{!collapsedMenu && (
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "auto" }}
							exit={{ width: 0 }}
						>
							<CreateGroupPopover>
								<Button
									size="sm"
									className="ml-1"
								>
									<Boxes />
									Create
								</Button>
							</CreateGroupPopover>
						</motion.div>
					)}
				</AnimatePresence>
			</CardFooter>
		</>
	);
};
