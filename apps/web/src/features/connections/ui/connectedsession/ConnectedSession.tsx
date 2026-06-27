import { sessionConnectionsSelectors } from "@/features/connections/model/sessionConnections.api";
import { Session } from "@/features/connections/ui/session/Session";
import { useAppSelector } from "@/shared";

export const ConnectedSession = ({
	connectedSessionId,
}: {
	connectedSessionId: string;
}) => {
	// redux
	const connection = useAppSelector((state) =>
		sessionConnectionsSelectors.selectById(state, connectedSessionId),
	);

	// fallbacks
	if (!connection) {
		return null;
	}

	// jsx
	return <Session sessionId={connection.session_id} />;
};
