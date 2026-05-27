import { authSchema, verifySchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

export class AuthenticationDto extends createZodDto(authSchema) {}
export class VerificationCodeDto extends createZodDto(verifySchema) {}
