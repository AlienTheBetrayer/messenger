import { Global, Module } from "@nestjs/common";

import { MailModule } from "../mail/mail.module";
import { VerifyService } from "./verify.service";

@Global()
@Module({
	imports: [MailModule],
	providers: [VerifyService],
	exports: [VerifyService],
})
export class VerifyModule {}
