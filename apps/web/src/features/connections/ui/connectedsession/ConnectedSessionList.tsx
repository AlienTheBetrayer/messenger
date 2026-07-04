import { selectConnectionIdsForGroup } from "@/features/connections/model/connection.selectors";
import { ConnectedSession } from "@/features/connections/ui/connectedsession/ConnectedSession";
import { useAppSelector } from "@/shared/model/redux.hooks";

export const ConnectedSessionList = ({ groupId }: { groupId: string }) => {
	const connectionIds = useAppSelector((state) =>
		selectConnectionIdsForGroup(state, groupId),
	);

	// fallback
	if (!connectionIds.length) {
		return null;
	}

	// jsx
	return (
		<ul className="flex flex-col gap-2">
			{connectionIds.map((id) => (
				<li
					key={id}
					className="*:w-full"
				>
					<ConnectedSession connectedSessionId={id} />
				</li>
			))}
		</ul>
	);
};
