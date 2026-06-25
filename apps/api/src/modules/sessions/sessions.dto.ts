import { groupCreateSchema, groupFormSchema, sessionAdd } from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * session
 */
export class SessionAddDto extends createZodDto(sessionAdd) {}

/**
 * group
 */
export class GroupCreateDto extends createZodDto(groupCreateSchema) {}
