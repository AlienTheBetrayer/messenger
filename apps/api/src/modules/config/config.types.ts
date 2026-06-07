import { ConfigService } from "@nestjs/config";
import z from "zod";

/**
 * schema for .env
 */
export const envSchema = z.object({
	// db
	DATABASE_URL: z.string(),
	DIRECT_URL: z.string(),

  // ports
  PORT: z.string(),

	// misc
	GMAIL_APP_PASSWORD: z.string(),

	// jwt
	SUPABASE_JWT_SECRET: z.string(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),

	// oauth
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

/**
 * config seervice type
 */
export class SafeConfigService extends ConfigService<EnvSchema> { };
