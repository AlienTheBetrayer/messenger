import { Module } from "@nestjs/common";

import {
	AuthModule,
	JwtModule,
	MailModule,
	PrismaModule,
	RootModule,
	VerifyModule,
} from "./modules";

/**
 * all available modules
 */
const imports = [
	RootModule,
	PrismaModule,
	AuthModule,
	MailModule,
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
