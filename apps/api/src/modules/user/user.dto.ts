import {
	userCreateSchema,
	userDeleteSchema,
	userEditSchema,
	userGetByUsernameSchema,
	userGetSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * users
 */
export class UserCreateDto extends createZodDto(userCreateSchema) {}
export class UserDeleteDto extends createZodDto(userDeleteSchema) {}
export class UserEditDto extends createZodDto(userEditSchema) {}
export class UserGetDto extends createZodDto(userGetSchema) {}
export class UserGetByUsernameDto extends createZodDto(
	userGetByUsernameSchema,
) {}
