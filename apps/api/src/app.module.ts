import { Module } from "@nestjs/common";
import { AuthModule, MailModule, PrismaModule, RootModule } from "./modules";
import { VerifyModule } from "./modules/verify/verify.module";

/**
 * all available modules
 */
const imports = [
	RootModule,
	PrismaModule,
	AuthModule,
	MailModule,
	VerifyModule,
];

/**
 * app module
 */
@Module({
	imports,
	providers: [],
})
export class AppModule {}
