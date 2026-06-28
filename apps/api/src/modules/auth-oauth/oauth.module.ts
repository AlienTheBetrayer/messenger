import { Module } from "@nestjs/common";

import { AppJwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { DiscordStrategy, GithubStrategy, GoogleStrategy } from "./external";
import { OAuthController } from "./oauth.controller";
import { OAuthService } from "./oauth.service";

/**
 * all oauth services
 */
const services = [GoogleStrategy, GithubStrategy, DiscordStrategy];

@Module({
	imports: [AppJwtModule, UserModule],
	controllers: [OAuthController],
	providers: [OAuthService, ...services],
})
export class OAuthModule {}
