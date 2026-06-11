import { authSchema, codeSchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * dto
 */
export class AuthCodeDto extends createZodDto(codeSchema) {}

export class AuthDto extends createZodDto(authSchema) {}
