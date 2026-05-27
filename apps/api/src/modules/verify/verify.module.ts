import { Module } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { VerifyService } from "./verify.service";
import { PrismaModule } from "../prisma/prisma.module";
import { MailModule } from "../mail/mail.module";

@Module({
	imports: [PrismaModule, MailModule],
	providers: [VerifyService],
	exports: [VerifyService],
})
export class VerifyModule {}
