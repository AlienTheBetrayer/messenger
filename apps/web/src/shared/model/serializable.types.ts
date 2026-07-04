import {
	auth_sessionsType,
	AuthCodeReturn,
	AuthCodeSchema,
	AuthForgotPasswordReturn,
	AuthLoginReturn,
	AuthLogoutReturn,
	AuthLogoutSchema,
	AuthMeReturn,
	AuthMeSchema,
	AuthSchema,
	AuthSignupReturn,
	ConnectionAddReturn,
	ConnectionAddSchema,
	ConnectionCodeReturn,
	ConnectionCodeSchema,
	ConnectionDeleteReturn,
	ConnectionDeleteSchema,
	ConnectionLoginReturn,
	ConnectionLoginSchema,
	connections_groupType,
	ConnectionsReturn,
	connectionsType,
	DateToString,
	GroupCreateReturn,
	NotificationsPushReturn,
	NotificationsPushSchema,
	notificationsType,
	NotificationsUpdateReturn,
	NotificationsUpdateSchema,
	usersType,
} from "@gravity/shared";

/**
 * converted types
 */
export type ConnectionsReturn__ = DateToString<ConnectionsReturn>;
export type connectionsType__ = DateToString<connectionsType>;
export type auth_sessionsType__ = DateToString<auth_sessionsType>;
export type usersType__ = DateToString<usersType>;
export type connections_groupType__ = DateToString<connections_groupType>;
export type AuthSchema__ = DateToString<AuthSchema>;
export type AuthSignupReturn__ = DateToString<AuthSignupReturn>;
export type AuthForgotPasswordReturn__ = DateToString<AuthForgotPasswordReturn>;
export type AuthMeSchema__ = DateToString<AuthMeSchema>;
export type AuthMeReturn__ = DateToString<AuthMeReturn>;
export type AuthLogoutSchema__ = DateToString<AuthLogoutSchema>;
export type AuthLogoutReturn__ = DateToString<AuthLogoutReturn>;
export type AuthLoginReturn__ = DateToString<AuthLoginReturn>;
export type AuthCodeReturn__ = DateToString<AuthCodeReturn>;
export type AuthCodeSchema__ = DateToString<AuthCodeSchema>;
export type notificationsType__ = DateToString<notificationsType>;
export type NotificationsPushSchema__ = DateToString<NotificationsPushSchema>;
export type NotificationsPushReturn__ = DateToString<NotificationsPushReturn>;
export type NotificationsUpdateReturn__ =
	DateToString<NotificationsUpdateReturn>;
export type NotificationsUpdateSchema__ =
	DateToString<NotificationsUpdateSchema>;
export type ConnectionDeleteSchema__ = DateToString<ConnectionDeleteSchema>;
export type ConnectionDeleteReturn__ = DateToString<ConnectionDeleteReturn>;
export type ConnectionLoginReturn__ = DateToString<ConnectionLoginReturn>;
export type ConnectionLoginSchema__ = DateToString<ConnectionLoginSchema>;
export type ConnectionCodeSchema__ = DateToString<ConnectionCodeSchema>;
export type ConnectionCodeReturn__ = DateToString<ConnectionCodeReturn>;
export type GroupCreateReturn__ = DateToString<GroupCreateReturn>;
export type ConnectionAddSchema__ = DateToString<ConnectionAddSchema>;
export type ConnectionAddReturn__ = DateToString<ConnectionAddReturn>;
