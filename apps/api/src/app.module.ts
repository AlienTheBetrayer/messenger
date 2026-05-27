import { Module } from "@nestjs/common";
import { RootModule, PrismaModule, AuthModule, MailModule } from "./modules";

@Module({
	imports: [RootModule, PrismaModule, AuthModule, MailModule],
	providers: [],
})
export class AppModule {}
