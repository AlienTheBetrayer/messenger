import { ExternalToast } from "sonner";

/**
 * notification statuses
 */
export type NotificationStatus = "idle" | "pending" | "resolved" | "rejected";

/**
 * notification types
 */
export type NotificationType =
	| "success"
	| "error"
	| "warning"
	| "info"
	| "promise";

/**
 * extra notification data
 */
export type NotificationExtra = {
	position: ExternalToast["position"];
	duration: number;
	description: string;
	action: React.ReactNode;
};

/**
 * notification type
 */
export type Notification = {
	id: string;
	text: string;
	type: NotificationType;
	createdAt: string;
	extra?: Partial<NotificationExtra>;
};
