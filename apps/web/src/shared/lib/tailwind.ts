import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * tailwind utility function used for merging classes (primarily by shadcn)
 * @param inputs classes
 * @returns tailwind className string
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
