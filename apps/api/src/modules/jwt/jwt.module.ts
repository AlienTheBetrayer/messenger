import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { JwtService } from "./jwt.service";

@Module({
	imports: [PrismaModule],
	exports: [JwtService],
	providers: [JwtService],
})
export class JwtModule {}
