import { Module } from "@nestjs/common";

import { JwtModule } from "../jwt/jwt.module";
import { PrismaModule } from "../prisma/prisma.module";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";
import { GoogleStrategy } from "./services/google.strategy";

/**
 * all oauth services
 */
const services = [GoogleStrategy];

@Module({
	imports: [PrismaModule, JwtModule],
	controllers: [OAuthController],
	providers: [OAuthService, ...services],
})
export class OAuthModule {}
