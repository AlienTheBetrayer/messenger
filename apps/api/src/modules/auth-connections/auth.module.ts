import { Global, Module } from "@nestjs/common";

import { AuthConnectionsController } from "./auth.controller";
import { AuthConnectionsService } from "./auth.service";

@Global()
@Module({
	controllers: [AuthConnectionsController],
  providers: [AuthConnectionsService],
  exports: [AuthConnectionsService],
})
export class AuthConnectionsModule {}
