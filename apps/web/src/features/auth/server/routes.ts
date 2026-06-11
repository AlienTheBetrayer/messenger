"use server";

import { AuthMeReturn } from "@gravity/shared";
import { updateTag } from "next/cache";

import { sfetch } from "@/shared/server/sfetch";

/**
 * server fetches /auth/me
 * @returns user object or error if not authenticated
 */
export const serverGetAuth = async () => {
	return (await (
		await sfetch("/auth/me", { next: { tags: ["me"] } })
	).json()) as Promise<{
		status?: boolean;
		data: AuthMeReturn;
	}>;
};