import { Check, EllipsisVertical } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { connectionSelectors } from "@/features/connections/model/connection.slice";
import { MiniProfileCube } from "@/features/connections/ui/other/MiniProfileCube";
import { SessionContextMenu } from "@/features/connections/ui/other/SessionContextMenu";
import {
	Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const ConnectedSession = ({
	connectedSessionId,
}: {
	connectedSessionId: string;
}) => {
	// redux
	const connection = useAppSelector((state) =>
		connectionSelectors.selectById(state, connectedSessionId),
	);
	const auth = useAuth();

	// fallbacks
	if (!connection) {
		return null;
	}

	if (auth?.user.id === connection.user_id) {
		return (
			<div className="relative h-12">
				<ConnectedSessionMainButton
					userId={connection.user_id}
					groupId={connection.group_id}
				/>

				<span className="absolute top-1/2 -translate-y-1/2 right-2 size-6 flex items-center justify-center text-green-secondary">
					<Check className="size-4" />
				</span>
			</div>
		);
	}

	// jsx
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="relative h-12">
					<ConnectedSessionMainButton
						userId={connection.user_id}
						groupId={connection.group_id}
					/>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								size="xs"
								variant="secondary"
								className="absolute top-1/2 right-2 -translate-y-1/2 aspect-square"
							>
								<EllipsisVertical />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-screen max-w-32 shadowed">
							<SessionContextMenu connectionId={connectedSessionId} />
						</PopoverContent>
					</Popover>
				</div>
			</ContextMenuTrigger>

			<ContextMenuContent className="w-screen max-w-32! shadowed p-3">
				<SessionContextMenu connectionId={connectedSessionId} />
			</ContextMenuContent>
		</ContextMenu>
	);
};

const ConnectedSessionMainButton = ({
	userId,
	groupId,
}: {
	userId: string;
	groupId?: string;
}) => {
	return (
		<MiniProfileCube
			userId={userId}
			groupId={groupId}
			props={{
				variant: "secondary",
				size: "xl",
				className: "not-hover:bg-muted/50 justify-start absolute inset-0",
			}}
		/>
	);
};
