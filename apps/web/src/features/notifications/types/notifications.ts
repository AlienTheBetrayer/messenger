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
 * notification interface
 */
export type Notification = {
	id: string;
	type: NotificationType;
	text: string;
	createdAt: string;
};
