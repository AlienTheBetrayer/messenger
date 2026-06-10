import { AuthMeReturn } from "@gravity/shared";

import { sfetch } from "@/shared/server/sfetch";

/**
 * server fetches /auth/me
 * @returns user object or error if not authenticated
 */
export const getAuth = async () => {
	return (await (await sfetch("/auth/me")).json()) as Promise<{
		status?: boolean;
		data: AuthMeReturn;
	}>;
};
