import { sessionSelectors } from "@/features/sessions/model/sessions.api";
import { SessionUser } from "@/features/sessions/ui/session/SessionUser";
import { useAppSelector } from "@/shared";

export const Session = ({ sessionId }: { sessionId: string }) => {
	// redux
	const session = useAppSelector((state) =>
		sessionSelectors.selectById(state, sessionId),
	);

	// fallback
	if (!session) {
		return null;
	}

	// jsx
	return <SessionUser userId={session.user_id} />;
};
