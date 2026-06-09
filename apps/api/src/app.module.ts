import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import {
	AuthModule,
	JwtModule,
	MailModule,
	PrismaModule,
	RootModule,
	UserModule,
	VerifyModule,
} from "./modules";
import { AuthInterceptor } from "./modules/auth/auth.interceptor";
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
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: AuthInterceptor,
		},
	],
})
export class AppModule {}
