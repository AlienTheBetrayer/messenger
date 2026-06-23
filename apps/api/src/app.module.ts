import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { AuthModule } from "./modules/auth/auth.module";
import { AuthCoreModule } from "./modules/auth-core/auth.module";
import {
  AuthInterceptor,
  RedirectExceptionInterceptor,
} from "./modules/auth-core/interceptors";
import { OAuthModule } from "./modules/auth-oauth/oauth.module";
import { AppJwtModule } from "./modules/jwt/jwt.module";
import { MailModule } from "./modules/mail/mail.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { RootModule } from "./modules/root/root.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
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
	AuthCoreModule,
	SessionsModule,
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
		{
			provide: APP_INTERCEPTOR,
			useClass: RedirectExceptionInterceptor,
		},
	],
})
export class AppModule {}
