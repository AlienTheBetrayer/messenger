import { sessionAdapter } from "@/features/connections/model/sessions.slice";
import { userAdapter } from "@/features/users/model/users.slice";
import { AuthMeReturn__ } from "@/shared/model/serializable.types";

/**
 * normalizes standard auth data and returns it
 * @param auth auth data
 * @returns normalized auth data
 */
export function normalizeAuthData(auth: AuthMeReturn__) {
	const { user, session } = auth;

	const normalized = {
		users: userAdapter.setAll(userAdapter.getInitialState(), [user]),
		authSessions: sessionAdapter.setAll(sessionAdapter.getInitialState(), [
			session,
		]),
		auth: {
			status: {
				userId: auth.user.id,
				sessionId: auth.session.id,
			},
		},
	};

	return normalized;
}
