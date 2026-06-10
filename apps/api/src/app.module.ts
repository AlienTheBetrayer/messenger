import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { AuthInterceptor } from "./modules/auth/auth.interceptor";
import { AuthModule } from "./modules/auth/auth.module";
import { AppJwtModule } from "./modules/jwt/jwt.module";
import { MailModule } from "./modules/mail/mail.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { OAuthModule } from "./modules/oauth/oauth.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RootModule } from "./modules/root/root.module";
import { UserModule } from "./modules/user/user.module";
import { VerifyModule } from "./modules/verify/verify.module";

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
	AppJwtModule,
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
