import { userCreateSchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * users/create
 */
export class UserCreateDto extends createZodDto(userCreateSchema) {}
