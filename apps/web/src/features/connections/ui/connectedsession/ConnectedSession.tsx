import { Check, EllipsisVertical } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
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
	const auth = useAuth();

	// fallbacks
	if (!connection || !session) {
		return null;
	}

	if (auth?.session.id === connection.session_id) {
		return (
			<div className="relative h-12">
        <ConnectedSessionMainButton userId={session.user_id} />
        
        <span className="absolute top-1/2 -translate-y-1/2 right-2 size-6 flex items-center justify-center text-green-secondary">
          <Check className="size-4"/>
        </span>
			</div>
		);
	}

	// jsx
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="relative h-12">
					<ConnectedSessionMainButton userId={session.user_id} />

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

const ConnectedSessionMainButton = ({ userId }: { userId: string }) => {
	return (
		<MiniProfileCube
			userId={userId}
			props={{
				variant: "secondary",
				size: "xl",
				className: "not-hover:bg-muted/50 justify-start absolute inset-0",
			}}
		/>
	);
};
