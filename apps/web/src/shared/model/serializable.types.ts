import {
	auth_sessionsType,
	AuthCodeReturn,
	AuthCodeSchema,
	AuthForgotPasswordReturn,
	AuthLoginConnectionReturn,
	AuthLoginConnectionSchema,
	AuthLoginReturn,
	AuthLogoutReturn,
	AuthLogoutSchema,
	AuthMeReturn,
	AuthMeSchema,
	AuthSchema,
	AuthSignupReturn,
	connected_sessionsType,
	ConnectionDeleteReturn,
	ConnectionDeleteSchema,
	ConnectionsReturn,
	DateToString,
	NotificationsPushReturn,
	NotificationsPushSchema,
	notificationsType,
	NotificationsUpdateReturn,
	NotificationsUpdateSchema,
	usersType,
} from "@gravity/shared";

import { ConnectedSessionGroup } from "@/features/connections/model/sessionGroup.api";

/**
 * converted types
 */
export type ConnectedSessionGroup__ = DateToString<ConnectedSessionGroup>;
export type ConnectionsReturn__ = DateToString<ConnectionsReturn>;
export type connected_sessionsType__ = DateToString<connected_sessionsType>;
export type auth_sessionsType__ = DateToString<auth_sessionsType>;
export type usersType__ = DateToString<usersType>;
export type AuthSchema__ = DateToString<AuthSchema>;
export type AuthSignupReturn__ = DateToString<AuthSignupReturn>;
export type AuthForgotPasswordReturn__ = DateToString<AuthForgotPasswordReturn>;
export type AuthMeSchema__ = DateToString<AuthMeSchema>;
export type AuthMeReturn__ = DateToString<AuthMeReturn>;
export type AuthLogoutSchema__ = DateToString<AuthLogoutSchema>;
export type AuthLogoutReturn__ = DateToString<AuthLogoutReturn>;
export type AuthLoginReturn__ = DateToString<AuthLoginReturn>;
export type AuthLoginConnectionReturn__ =
	DateToString<AuthLoginConnectionReturn>;
export type AuthLoginConnectionSchema__ =
	DateToString<AuthLoginConnectionSchema>;
export type AuthCodeReturn__ = DateToString<AuthCodeReturn>;
export type AuthCodeSchema__ = DateToString<AuthCodeSchema>;
export type notificationsType__ = DateToString<notificationsType>;
export type NotificationsPushSchema__ = DateToString<NotificationsPushSchema>;
export type NotificationsPushReturn__ = DateToString<NotificationsPushReturn>;
export type NotificationsUpdateReturn__ =
	DateToString<NotificationsUpdateReturn>;
export type NotificationsUpdateSchema__ =
	DateToString<NotificationsUpdateSchema>;
export type ConnectionsDeleteSchema__ = DateToString<ConnectionDeleteSchema>;
export type ConnectionDeleteReturn__ = DateToString<ConnectionDeleteReturn>;
