import {
	authLoginConnectionSchema,
	authSchema,
	codeSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * /auth/code
 */
export class AuthCodeDto extends createZodDto(codeSchema) {}

/**
 * /auth/login, /auth/signup, /auth/forgot-password
 */
export class AuthDto extends createZodDto(authSchema) {}
export class AuthConnectionDto extends createZodDto(
	authLoginConnectionSchema,
) {}
