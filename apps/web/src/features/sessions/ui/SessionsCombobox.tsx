"use client";

import { PlusIcon } from "lucide-react";

import { useGetGroupsQuery } from "@/features/sessions/model/sessionGroup.api";
import { SessionsList } from "@/features/sessions/ui/SessionsList";
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared";

export const SessionsCombobox = () => {
	// redux
	const { data: sessions, isLoading } = useGetGroupsQuery();

	if (isLoading) {
		return <div className="w-full h-32 skeleton" />;
	}

	if (!sessions) {
		return <div>empty</div>;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xs">Connected sessions</CardTitle>
				<CardAction>
					<Button
						size="sm"
            variant="ghost"
            className="aspect-square"
					>
						<PlusIcon />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<SessionsList />
			</CardContent>
		</Card>
	);
};
