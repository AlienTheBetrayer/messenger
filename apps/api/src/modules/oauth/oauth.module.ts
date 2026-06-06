import { Module } from "@nestjs/common";

import { JwtModule } from "../jwt/jwt.module";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { GithubStrategy } from "./external/github.service";
import { GoogleStrategy } from "./external/google.service";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";

/**
 * all oauth services
 */
const services = [GoogleStrategy, GithubStrategy];

@Module({
	imports: [PrismaModule, JwtModule, UserModule],
	controllers: [OAuthController],
	providers: [OAuthService, ...services],
})
export class OAuthModule {}
