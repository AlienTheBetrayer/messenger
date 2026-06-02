import { AuthConfig, randomString } from "@gravity/shared";

import { VerifyService } from "../../../modules";
import { Factory } from "../types";

/**
 * verify service factory for jest
 */
export const VerifyServiceFactory: Factory<
	VerifyService,
	"issueCode" | "validateCode"
> = {
	issueCode: (overrides) => {
		return {
			id: crypto.randomUUID(),
			code: randomString(AuthConfig.code.length, "0123456789"),
			email: "m@gmail.com",
			type: "login",
			created_at: new Date(),
			expiry_at: new Date(Date.now() + AuthConfig.code.expiryMs),
			...overrides,
		};
	},
	validateCode: (overrides) => ({
		id: crypto.randomUUID(),
		code: randomString(AuthConfig.code.length, "0123456789"),
		email: "m@gmail.com",
		type: "login",
		created_at: new Date(),
		expiry_at: new Date(Date.now() + AuthConfig.code.expiryMs),
		...overrides,
	}),
};
