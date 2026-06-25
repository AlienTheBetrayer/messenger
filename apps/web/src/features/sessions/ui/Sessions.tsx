"use client";

import { Boxes } from "lucide-react";

import { useGetGroupsQuery } from "@/features/sessions/model/sessionGroup.api";
import { CreateGroupPopover } from "@/features/sessions/ui/group/CreateGroupFormPopover";
import { GroupList } from "@/features/sessions/ui/group/GroupsList";
import { WipeSessionsMessageBox } from "@/features/ui/ui/messageboxes/WipeSessionsMessageBox";
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	useAppDispatch,
} from "@/shared";

export const Sessions = () => {
	return (
		<Card className="p-0">
			<SessionsDisplay />
		</Card>
	);
};

const SessionsDisplay = () => {
	// redux
	const { data: sessions, isLoading } = useGetGroupsQuery();
	const dispatch = useAppDispatch();

	// fallbacks
	if (isLoading) {
		return (
			<div className="flex flex-col gap-0.5! p-2!">
				{Array.from({ length: 5 }, (_, i) => (
					<div
						key={i}
						className="h-5 w-full skeleton rounded-sm!"
					/>
				))}
			</div>
		);
	}

	if (!sessions) {
		return null;
	}

	// jsx
	return (
		<>
			<CardContent className="p-4 fade-bottom">
				<GroupList />
			</CardContent>

			<CardFooter className="flex gap-1 items-center justify-end p-1">
				<CreateGroupPopover>
					<Button
						size="sm"
						onClick={() => {}}
					>
						<Boxes />
						Create
					</Button>
				</CreateGroupPopover>
				<WipeSessionsMessageBox />
			</CardFooter>
		</>
	);
};
