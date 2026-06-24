import { AuthMeReturn } from "@gravity/shared";

/**
 * normalizes standard auth data and returns it
 * @param auth auth data
 * @returns normalized auth data
 */
export function normalizeAuthData(auth: AuthMeReturn) {
	const { user } = auth;

	const normalizedUsers = {
		ids: user ? [user.id] : [],
		entities: user ? { [user.id]: user } : {},
	};

	return { normalizedUsers };
}
