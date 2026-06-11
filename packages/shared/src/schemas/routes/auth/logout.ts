import { auth_sessionType } from "../../prisma/schemas/models/auth_session.schema";

/**
 * schema
 */
export type AuthLogoutSchema = void;

/**
 * return
 */
export type AuthLogoutReturn = {
	session: auth_sessionType | null;
};
