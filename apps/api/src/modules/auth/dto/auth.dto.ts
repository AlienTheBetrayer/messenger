import { authSchema } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

export class RegisterDto extends createZodDto(authSchema) {}
