import { authRequestSchema, authSchema, verifySchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * DTOs
 */
export class AuthenticationDto extends createZodDto(authSchema) {}
export class VerificationCodeDto extends createZodDto(verifySchema) {}
export class AuthRequestDto extends createZodDto(authRequestSchema) {}
