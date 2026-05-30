import { Module } from "@nestjs/common";

import { JwtModule } from "../jwt/jwt.module";
import { PrismaModule } from "../prisma/prisma.module";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";
import { GithubStrategy } from "./services/github.strategy";
import { GoogleStrategy } from "./services/google.strategy";

/**
 * all oauth services
 */
const services = [GoogleStrategy, GithubStrategy];

@Module({
	imports: [PrismaModule, JwtModule],
	controllers: [OAuthController],
	providers: [OAuthService, ...services],
})
export class OAuthModule {}
