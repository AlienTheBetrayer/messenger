import { usersType } from "../../prisma/schemas/models/users.schema";

/**
 * return
 */
export type AuthForgotPasswordReturn = {
	user: usersType;
};
