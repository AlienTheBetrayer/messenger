import { userCreateSchema, userDeleteSchema, userEditSchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * users
 */
export class UserCreateDto extends createZodDto(userCreateSchema) {}
export class UserDeleteDto extends createZodDto(userDeleteSchema) { }
export class UserEditDto extends createZodDto(userEditSchema) { }