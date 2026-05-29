import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { RootController } from "./root.controller.js";
import { RootService } from "./root.service.js";

@Module({
	controllers: [RootController],
	providers: [RootService],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
})
export class RootModule {}
