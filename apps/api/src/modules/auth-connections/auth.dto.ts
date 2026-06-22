import { authSessionOauthInit } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

export class AuthSessionOauthInitDto extends createZodDto(
	authSessionOauthInit,
) {}
