import { groupSelectors } from "@/features/sessions/model/sessionGroup.api";
import { ConnectedSessionList } from "@/features/sessions/ui/connectedsession/ConnectedSessionList";
import { useAppSelector } from "@/shared";

export const Group = ({ groupId }: { groupId: string }) => {
	// redux
	const group = useAppSelector((state) =>
		groupSelectors.selectById(state, groupId),
	);

	// fallback
	if (!group) {
		return null;
	}

	// jsx
	return (
		<div>
			{group.title}

			<ConnectedSessionList connectedSessionIds={group.connectedSessionIds} />
		</div>
	);
};
