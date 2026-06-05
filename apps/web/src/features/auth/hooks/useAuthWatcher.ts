import { useMeQuery } from "@/features/auth/model/auth.slice";

/**
 * initializes profile and authentication process
 */
export const useAuthWatcher = () => {
  return useMeQuery(undefined, { refetchOnFocus: true, refetchOnReconnect: true });
};

/**
 * hook that provides data about the authentication
 * @returns auth data
 */
export const useAuth = () => useAuthWatcher();