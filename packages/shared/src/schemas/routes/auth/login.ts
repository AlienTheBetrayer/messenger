import { auth_sessionType } from "../../prisma/schemas/models/auth_session.schema";
import { usersType } from "../../prisma/schemas/models/users.schema";

/**
 * return
 */
export type AuthLoginReturn = {
	accessToken: string;
	refreshToken: string;
	session: auth_sessionType;
	user: usersType;
};
