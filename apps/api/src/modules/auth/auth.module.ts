import { Module } from "@nestjs/common";

import { JwtModule } from "../jwt/jwt.module.js";
import { PrismaModule } from "../prisma/prisma.module.js";
import { VerifyModule } from "../verify/verify.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
	imports: [PrismaModule, VerifyModule, JwtModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
