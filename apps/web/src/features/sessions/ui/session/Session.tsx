import { sessionSelectors } from "@/features/sessions/model/sessions.api";
import { MiniProfileCube } from "@/features/sessions/ui/other/MiniProfileCube";
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
	return (
		<MiniProfileCube
			userId={session.user_id}
			props={{
				variant: "secondary",
				size: "lg",
				className: "not-hover:bg-muted/50 justify-start",
			}}
		/>
	);
};
