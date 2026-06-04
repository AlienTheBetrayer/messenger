import { useMeQuery } from "@/features/auth/model/auth.slice";

/**
 * initializes profile and authentication process
 */
export const useAuthWatcher = () => {
	useMeQuery(undefined, { refetchOnFocus: true, refetchOnReconnect: true });
};
