import { Global, Module } from "@nestjs/common";

import { ConnectionsController } from "./connections.controller";
import { ConnectionsService } from "./connections.service";
import { ConnectionsCoreService } from "./connections-core.service";

@Global()
@Module({
	controllers: [ConnectionsController],
	providers: [ConnectionsService, ConnectionsCoreService],
	exports: [ConnectionsService, ConnectionsCoreService],
})
export class ConnectionsModule {}
