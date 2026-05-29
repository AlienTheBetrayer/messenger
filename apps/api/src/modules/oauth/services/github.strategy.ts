/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
      clientSecret: configService.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  validate(profile: Profile) {
    return {
      provider: "google",
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName || profile.username,
    };
  }
}
