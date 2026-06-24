import { sessionConnectionsSelectors } from "@/features/sessions/model/sessionConnections.api";
import { Session } from "@/features/sessions/ui/session/Session";
import { useAppSelector } from "@/shared";

export const ConnectedSession = ({
	connectedSessionId,
}: {
	connectedSessionId: string;
}) => {
	// redux
	const session = useAppSelector((state) =>
		sessionConnectionsSelectors.selectById(state, connectedSessionId),
	);

	// fallbacks
	if (!session) {
		return null;
	}

	// jsx
	return <Session sessionId={session.session_id} />;
};
