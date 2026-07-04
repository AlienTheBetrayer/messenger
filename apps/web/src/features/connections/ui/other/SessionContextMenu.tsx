import { LogOut, Trash2Icon } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useConnectionActions } from "@/features/connections/hooks/useConnectionActions";
import { selectConnectionsForGroup } from "@/features/connections/model/connection.selectors";
import { connectionSelectors } from "@/features/connections/model/connection.slice";
import { groupSelectors } from "@/features/connections/model/group.slice";
import { DeleteConnectionMessageBox } from "@/features/ui/ui/messageboxes/DeleteConnectionMessageBox";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shared";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const SessionContextMenu = ({
	connectionId,
}: {
	connectionId: string;
}) => {
	// redux
	const auth = useAuth();
	const connection = useAppSelector((state) =>
		connectionSelectors.selectById(state, connectionId),
	);
	const group = useAppSelector(
		(state) =>
			connection && groupSelectors.selectById(state, connection.group_id),
	);
	const connectionsForGroup = useAppSelector(
		(state) => group && selectConnectionsForGroup(state, group.id),
  );
  
  // actions
	const { deleteConnection, loginConnection } = useConnectionActions();

  // fallbacks
	if (!group || !connection) {
		return null;
	}

	// ui states
	const isOwner = group.owner_user_id === auth?.user.id;
	const isAlone =
		connectionsForGroup.length === 1 &&
		connectionsForGroup[0].id === connectionId;
	const isMyself = connection.user_id === auth?.user.id;

	const ableToKick = !isAlone && isOwner && !isMyself;
	const ableToJoin = !isMyself;

	// jsx
	return (
		<ul className="flex flex-col gap-2 *:w-full">
			<li>
				<Tooltip open={!ableToJoin ? undefined : false}>
					<TooltipTrigger asChild>
						<Button
							onClick={() => {
								loginConnection({ connectionId });
							}}
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
						<span className="w-full inline-block">
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
