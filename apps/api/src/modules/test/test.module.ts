import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { TestController } from './test.controller.js';
import { TestService } from './test.service.js';

@Module({
	imports: [PrismaModule],
	controllers: [TestController],
	providers: [TestService],
})
export class TestModule {}
