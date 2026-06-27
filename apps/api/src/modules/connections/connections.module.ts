import { Global, Module } from "@nestjs/common";

import { ConnectionsController } from "./connections.controller";
import { ConnectionsService } from "./connections.service";

@Global()
@Module({
	controllers: [ConnectionsController],
	providers: [ConnectionsService],
	exports: [ConnectionsService],
})
export class ConnectionsModule {}
