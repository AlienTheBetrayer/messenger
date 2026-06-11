import { usersType } from "../../prisma/schemas/models/users.schema";

/**
 * schema
 */
export type AuthMeSchema = void;

/**
 * return
 */
export type AuthMeReturn = {
	user: usersType | null;
};
