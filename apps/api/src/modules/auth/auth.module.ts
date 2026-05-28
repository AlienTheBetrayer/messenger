import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module.js";
import { VerifyModule } from "../verify/verify.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
	imports: [PrismaModule, VerifyModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
