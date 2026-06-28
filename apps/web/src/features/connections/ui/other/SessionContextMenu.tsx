import { LogOut, Trash2Icon } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useConnectionActions } from "@/features/connections/hooks/useConnectionActions";
import { sessionConnectionsSelectors } from "@/features/connections/model/sessionConnections.api";
import { groupSelectors } from "@/features/connections/model/sessionGroup.api";
import { DeleteConnectionMessageBox } from "@/features/ui/ui/messageboxes/DeleteConnectionMessageBox";
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	useAppSelector,
} from "@/shared";

export const SessionContextMenu = ({
	connectionId,
}: {
	connectionId: string;
}) => {
	// redux
	const auth = useAuth();
	const connection = useAppSelector((state) =>
		sessionConnectionsSelectors.selectById(state, connectionId),
	);
	const group = useAppSelector((state) =>
		groupSelectors.selectById(state, connection?.group_id ?? ""),
	);
	const { deleteConnection } = useConnectionActions();

	if (!group || !connection) {
		return null;
	}

	// ui states
	const isOwner = group.owner_user_id === auth?.user.id;
	const isAlone =
		group.connectedSessionIds.length === 1 &&
		group.connectedSessionIds[0] === connectionId;
	const isMyself = connection.session_id === auth?.session.id;

	const ableToKick = !isAlone && isOwner && !isMyself;
  const ableToJoin = !isMyself;

	// jsx
	return (
		<ul className="flex flex-col gap-2 *:w-full">
			<li>
				<Tooltip open={!ableToJoin ? undefined : false}>
					<TooltipTrigger asChild>
						<Button
							className="w-full justify-start"
							size="sm"
							disabled={!ableToJoin}
						>
							<LogOut />
							Log in
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>You cannot login as this member.</p>
					</TooltipContent>
				</Tooltip>
			</li>

			<li>
				<Tooltip open={!ableToKick ? undefined : false}>
					<TooltipTrigger asChild>
						<span className="w-fit inline-block">
							<DeleteConnectionMessageBox
								type="connection"
								onConfirm={() => {
									deleteConnection({ connectionId });
								}}
							>
								<Button
									size="sm"
									variant="destructive"
									className="w-full justify-start"
									disabled={!ableToKick}
								>
									<Trash2Icon />
									Disconnect
								</Button>
							</DeleteConnectionMessageBox>
						</span>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>You cannot disconnect this member.</p>
					</TooltipContent>
				</Tooltip>
			</li>
		</ul>
	);
};
