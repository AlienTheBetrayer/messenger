import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module.js';
import { RootModule } from './modules/root/root.module.js';

@Module({
	imports: [RootModule, AuthModule],
	providers: [],
})
export class AppModule {}
