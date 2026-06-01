import {
	authRequestSchema,
	authSchema,
	verificationSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * shared DTOs
 */
export class AuthenticationDto extends createZodDto(authSchema) {}
export class VerificationCodeDto extends createZodDto(verificationSchema) {}
export class AuthRequestDto extends createZodDto(authRequestSchema) {}
