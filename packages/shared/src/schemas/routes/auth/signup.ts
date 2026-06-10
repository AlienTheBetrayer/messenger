import { usersType } from "../../prisma/schemas/models/users.schema.js";

/**
 * return
 */
export type AuthSignupReturn = {
	user: usersType;
};
