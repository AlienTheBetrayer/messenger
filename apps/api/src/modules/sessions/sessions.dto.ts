import { sessionAdd } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

export class SessionAddDto extends createZodDto(sessionAdd) {}
