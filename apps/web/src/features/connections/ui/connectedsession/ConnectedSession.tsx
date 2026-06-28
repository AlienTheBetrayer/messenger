import { EllipsisVertical } from "lucide-react";

import { sessionConnectionsSelectors } from "@/features/connections/model/sessionConnections.api";
import { sessionSelectors } from "@/features/connections/model/sessions.api";
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
	useAppSelector,
} from "@/shared";

export const ConnectedSession = ({
	connectedSessionId,
}: {
	connectedSessionId: string;
}) => {
	// redux
	const connection = useAppSelector((state) =>
		sessionConnectionsSelectors.selectById(state, connectedSessionId),
	);
	const session = useAppSelector((state) =>
		sessionSelectors.selectById(state, connection.session_id ?? ""),
	);

	// fallbacks
	if (!connection || !session) {
		return null;
	}

	// jsx
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="relative h-12">
					<MiniProfileCube
						userId={session.user_id}
						props={{
							variant: "secondary",
							size: "xl",
							className: "not-hover:bg-muted/50 justify-start absolute inset-0",
						}}
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
