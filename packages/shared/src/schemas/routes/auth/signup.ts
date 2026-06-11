import { usersType } from "../../prisma/schemas/models/users.schema";

/**
 * return
 */
export type AuthSignupReturn = {
	user: usersType;
};
