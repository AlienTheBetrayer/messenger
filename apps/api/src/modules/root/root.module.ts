import { Module } from '@nestjs/common';
import { RootController } from './root.controller.js';
import { RootService } from './root.service.js';

@Module({
	controllers: [RootController],
	providers: [RootService],
})
export class RootModule {}
