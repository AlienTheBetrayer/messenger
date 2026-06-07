import { notification_type } from "@gravity/shared";
import { ExternalToast } from "sonner";

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
export type NotificationInput = {
	id: string;
	text: string;
	type: notification_type;
	createdAt: string;
	extra?: Partial<NotificationExtra>;
};
