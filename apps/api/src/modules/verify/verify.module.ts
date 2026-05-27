import { Module } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { VerifyService } from "./verify.service";

@Module({
	imports: [PrismaService, MailService],
	providers: [VerifyService],
	exports: [VerifyService],
})
export class VerifyModule {}
