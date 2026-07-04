import {
	connectionAddSchema,
	connectionCodeSchema,
	connectionDeleteSchema,
	connectionInitSchema,
	connectionLoginSchema,
	connectionVerifyFormSchema,
	groupCreateSchema,
	groupDeleteSchema,
	groupEditSchema,
} from "@gravity/shared";
import { createZodDto } from "nestjs-zod";

/**
 * connections
 */
export class ConnectionAddDto extends createZodDto(connectionAddSchema) {}
export class ConnectionDeleteDto extends createZodDto(connectionDeleteSchema) {}
export class ConnectionInitDto extends createZodDto(connectionInitSchema) {}
export class ConnectionLoginDto extends createZodDto(connectionLoginSchema) {}
export class ConnectionCodeDto extends createZodDto(connectionCodeSchema) {}

/**
 * group
 */
export class GroupCreateDto extends createZodDto(groupCreateSchema) {}
export class GroupEditDto extends createZodDto(groupEditSchema) {}
export class GroupDeleteDto extends createZodDto(groupDeleteSchema) {}
