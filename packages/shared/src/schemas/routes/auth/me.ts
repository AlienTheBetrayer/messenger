import { usersType } from "../../prisma/schemas/models/users.schema.js";

/**
 * schema
 */
export type AuthMeSchema = void;

/**
 * return
 */
export type AuthMeReturn = {
  user: usersType;
};
