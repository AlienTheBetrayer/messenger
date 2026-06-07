import { Module } from "@nestjs/common";

import {
	AuthModule,
	JwtModule,
	MailModule,
	PrismaModule,
	RootModule,
	UserModule,
	VerifyModule,
} from "./modules";
import { OAuthModule } from "./modules/oauth/oauth.module";

/**
 * all available modules
 */
const imports = [
	RootModule,
	PrismaModule,
	AuthModule,
	OAuthModule,
	MailModule,
	UserModule,
	VerifyModule,
	JwtModule,
];

/**
 * app module
 */
@Module({
	imports,
	providers: [],
})
export class AppModule {}
