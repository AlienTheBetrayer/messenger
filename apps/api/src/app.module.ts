import { Module } from "@nestjs/common";
import { RootModule } from "./modules/root/root.module.js";
import { TestModule } from "./modules/test/test.module.js";

@Module({
    imports: [RootModule, TestModule],
    providers: [],
})
export class AppModule {}
