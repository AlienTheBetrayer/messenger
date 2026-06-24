"use client";

import { Plus } from "lucide-react";

import { useGetGroupsQuery } from "@/features/sessions/model/sessionGroup.api";
import { GroupList } from "@/features/sessions/ui/group/GroupsList";
import { WipeSessionsMessageBox } from "@/features/ui/ui/messageboxes/WipeSessionsMessageBox";
import { Button, Card, CardContent, CardFooter } from "@/shared";

export const SessionsCombobox = () => {
	// redux
	const { data: sessions, isLoading } = useGetGroupsQuery();

	// fallbacks
	if (isLoading) {
		return (
			<div className="flex flex-col gap-1! p-2! shell">
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						className="h-6 w-full skeleton"
					/>
				))}
			</div>
		);
	}

	if (!sessions) {
		return <div>empty</div>;
	}

	// jsx
	return (
		<Card className="p-0">
			<CardContent className="p-4 fade-bottom">
				<GroupList />
			</CardContent>

			<CardFooter className="flex gap-1 items-center justify-end p-1">
				<Button size="sm">
					<Plus />
					Connect
				</Button>
				<WipeSessionsMessageBox />
			</CardFooter>
		</Card>
	);
};
