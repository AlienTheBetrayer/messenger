"use client";

import { Boxes, ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { connectionsApi } from "@/features/connections/model/connections.api";
import { CreateGroupPopover } from "@/features/connections/ui/group/CreateGroupFormPopover";
import { GroupList } from "@/features/connections/ui/group/GroupsList";
import { MiniProfileCube } from "@/features/connections/ui/other/MiniProfileCube";
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

export const Connections = () => {
	return (
		<Card className="p-0 gap-0">
			<ConnectionsDisplay />
		</Card>
	);
};

const ConnectionsDisplay = () => {
	// redux
	const dispatch = useAppDispatch();
	const prefetchConnections = connectionsApi.usePrefetch("getConnections");
	const collapsedMenu = useAppSelector(selectConnectSessionsCollapsedMenu);
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
						>
							{<GroupList />}
						</motion.div>
					)}
				</AnimatePresence>
			</CardContent>

			<CardFooter
				className="flex items-center p-1.5"
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
							className="overflow-hidden grow"
						>
							<MiniProfileCube userId={auth?.user.id ?? ""} />
						</motion.div>
					)}
				</AnimatePresence>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="aspect-square ml-auto"
							variant="secondary"
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
