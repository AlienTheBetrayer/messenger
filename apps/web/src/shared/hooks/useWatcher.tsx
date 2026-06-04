"use client";

import { useAuthWatcher } from "@/features/auth/hooks/useAuthWatcher";

/**
 * global watcher object
 */
export const useWatcher = () => {
	useAuthWatcher();
};

export const Watcher = () => {
  useWatcher();
  
	return null;
};