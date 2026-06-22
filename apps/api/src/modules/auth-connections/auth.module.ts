import { Module } from "@nestjs/common";

import { AuthConnectionsController } from "./auth.controller";
import { AuthConnectionsService } from "./auth.service";

@Module({
	controllers: [AuthConnectionsController],
	providers: [AuthConnectionsService],
})
export class AuthConnectionsModule {}
