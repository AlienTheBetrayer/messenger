/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";

import { GithubUserEmails, OAuthIdentity } from "../oauth.types";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
	constructor(configService: ConfigService) {
		super({
			clientID: configService.getOrThrow<string>("GITHUB_CLIENT_ID"),
			clientSecret: configService.getOrThrow<string>("GITHUB_CLIENT_SECRET"),
			callbackURL: "http://localhost:3001/oauth/github/callback",
			scope: ["user:email"],
		});
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
	) {
		const data: OAuthIdentity = {
			provider: "github",
			providerId: profile.id,
			email: profile.emails?.[0]?.value,
			name: profile.displayName || profile.username || "Unnamed",
			profileUrl: profile.profileUrl,
		};

    if (data.email) {
      // data.error = "EMAIL_NOT_FOUND";
			return data;
		}

		// email not found - getting the email
		const emails = (await (
			await fetch("https://api.github.com/user/emails", {
				headers: {
					Authorization: `Bearer ${_accessToken}`,
					Accept: "application/vnd.github+json",
					"X-GitHub-Api-Version": "2026-03-10",
				},
			})
		).json()) as GithubUserEmails[];

		const email = emails.find((e) => e.primary);
		data.email = email?.email;

		// error handling
		if (!email?.email) {
			data.error = "EMAIL_NOT_FOUND";
		}

		return data;
	}
}
