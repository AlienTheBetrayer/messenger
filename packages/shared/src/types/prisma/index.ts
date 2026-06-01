import prismaSchema from "./json-schema.json" with { type: "json" };

type Schema = typeof prismaSchema;
export type PrismaTypes = Schema["definitions"];
