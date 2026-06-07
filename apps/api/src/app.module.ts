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
import { NotificationsModule } from "./modules/notifications/notifications.module";
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
	NotificationsModule,
];

/**
 * app module
 */
@Module({
	imports,
	providers: [],
})
export class AppModule {}
