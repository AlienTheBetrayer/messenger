import { useMeQuery } from "@/features/auth/model/auth.api";

/**
 * wrapper around useMeQuery(). gets authentication data (instantly hydrated from the server)
 * @returns useMeQuery()
 */
export const useAuth = () => {
	return useMeQuery();
};
