import { usersType } from "@gravity/shared";

import { sfetch } from "@/shared/server/sfetch";

/**
 * server fetches /auth/me
 * @returns user object or error if not authenticated
 */
export const getUser = async () => {
	return (await (
		await sfetch("http://localhost:3001/auth/me")
	).json()) as Promise<usersType>;
};
