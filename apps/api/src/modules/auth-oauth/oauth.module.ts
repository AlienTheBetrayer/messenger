import { Module } from "@nestjs/common";

import { AuthConnectionsModule } from "../auth-connections/auth.module";
import { AppJwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { GithubStrategy, GoogleStrategy } from "./external";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";

/**
 * all oauth services
 */
const services = [GoogleStrategy, GithubStrategy];

@Module({
	imports: [AppJwtModule, UserModule],
	controllers: [OAuthController],
	providers: [OAuthService, ...services],
})
export class OAuthModule {}
