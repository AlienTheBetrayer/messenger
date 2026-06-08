import { Global, Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { JwtService } from "./jwt.service";

@Global()
@Module({
	imports: [PrismaModule],
	exports: [JwtService],
	providers: [JwtService],
})
export class JwtModule {}
