import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

import { AppConfigService } from "../../config/config.service";
import { OAuthIdentityType } from "../oauth.decorators";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(private readonly configService: AppConfigService) {
		super({
			clientID: configService.get("GOOGLE_CLIENT_ID"),
			clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
			callbackURL: "http://localhost:3001/oauth/google/callback",
			scope: ["email", "profile"],
		});
	}

	validate(_accessToken: string, _refreshToken: string, profile: Profile) {
		const data: OAuthIdentityType = {
			provider: "google",
			providerId: profile.id,
			email: profile.emails?.[0]?.value,
			name: profile.displayName || profile.username || "Unnamed",
			profileUrl: profile.profileUrl,
		};

		// error handling
		if (!data.email) {
			data.error = "EMAIL_NOT_FOUND";
		}

		return data;
	}
}
