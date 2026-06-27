import { ConnectedSession } from "@/features/connections/ui/connectedsession/ConnectedSession";

export const ConnectedSessionList = ({
	connectedSessionIds,
}: {
	connectedSessionIds: string[];
}) => {
	// fallback
	if (!connectedSessionIds.length) {
		return null;
	}

	// jsx
	return (
		<ul className="flex flex-col gap-2">
			{connectedSessionIds.map((id) => (
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
