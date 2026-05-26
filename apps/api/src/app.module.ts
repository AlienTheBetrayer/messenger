import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module.js';
import { MailModule } from './modules/mail/mail.module.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { RootModule } from './modules/root/root.module.js';

@Module({
	imports: [RootModule, PrismaModule, AuthModule, MailModule],
	providers: [],
})
export class AppModule {}
