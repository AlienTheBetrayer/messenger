/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
			clientSecret: configService.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
			callbackURL: "http://localhost:3001/oauth/google/callback",
			scope: ["email", "profile"],
		});
	}

	validate(_accessToken: string, _refreshToken: string, profile: Profile) {
		return {
			provider: "google",
			providerId: profile.id,
			email: profile.emails?.[0]?.value,
			name: profile.displayName || profile.username || "Unnamed",
			profileUrl: profile.profileUrl,
		};
	}
}
