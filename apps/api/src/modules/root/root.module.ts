import { Module } from "@nestjs/common";

import { AppConfigModule } from "../config/config.module";
import { RootController } from "./root.controller";
import { RootService } from "./root.service";

@Module({
	controllers: [RootController],
	providers: [RootService],
	imports: [AppConfigModule],
})
export class RootModule {}
