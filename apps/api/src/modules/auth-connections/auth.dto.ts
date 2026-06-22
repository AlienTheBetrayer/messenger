import { authSessionAdd } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

export class AuthSessionAddDto extends createZodDto(authSessionAdd) {}
