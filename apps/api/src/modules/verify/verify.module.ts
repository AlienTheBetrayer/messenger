import { Module } from "@nestjs/common";

import { MailModule } from "../mail/mail.module";
import { PrismaModule } from "../prisma/prisma.module";
import { VerifyService } from "./verify.service";

@Module({
	imports: [PrismaModule, MailModule],
	providers: [VerifyService],
	exports: [VerifyService],
})
export class VerifyModule {}
