import {
	AuthConfig,
	ExceptionCode,
	verification_codesType,
} from "@gravity/shared";

/**
 * template type for all variants
 */
type AuthFormVariant = {
	title: string;
	description: string;

	elements: {
		email: {
			enabled: boolean;
			placeholder: string;
			description: string;
		};
		password: {
			enabled: boolean;
			placeholder: string;
			description: string;
		};
		forgotButtons: {
			enabled: boolean;
		};
		serviceButtons: {
			enabled: boolean;
		};
		headerLink: {
			enabled: boolean;
			href: string;
			text: string;
		};
		submitButton: {
			enabled: boolean;
			text: string;
		};
	};
};

type VerifyFormVariant = {
	title: string;
	description: string;

	elements: {
		code: {
			enabled: boolean;
			placeholder: string;
			description: string;
		};
	};
};

/**
 * text variants for the auth form's fields
 */
export const AuthFormVariants = {
	login: {
		title: "Login",
		description: "Welcome back! Log in to continue.",

		elements: {
			email: {
				enabled: true,
				placeholder: "m@example.com",
				description: "",
			},
			password: {
				enabled: true,
				placeholder: "",
				description:
					"Your account password. Incorrect entry will require restarting the verification process.",
			},
			forgotButtons: {
				enabled: true,
			},
			serviceButtons: {
				enabled: true,
			},
			headerLink: {
				enabled: true,
				href: "/signup",
				text: "Sign up",
			},
			submitButton: {
				enabled: true,
				text: "Log in",
			},
		},
	},
	signup: {
		title: "Sign up",
		description: "Create your account to get started.",

		elements: {
			email: {
				enabled: true,
				placeholder: "m@example.com",
				description: "",
			},
			password: {
				enabled: true,
				placeholder: "",
				description: "",
			},
			forgotButtons: {
				enabled: false,
			},
			serviceButtons: {
				enabled: true,
			},
			headerLink: {
				enabled: true,
				href: "/login",
				text: "Login",
			},
			submitButton: {
				enabled: true,
				text: "Sign up",
			},
		},
	},
	forgot_password: {
		title: "Password recovery",
		description: "Enter your email to receive a verification code.",

		elements: {
			email: {
				enabled: true,
				placeholder: "m@example.com",
				description: "",
			},
			password: {
				enabled: true,
				placeholder: "",
				description: "Choose a new secure password for your account.",
			},
			forgotButtons: {
				enabled: false,
			},
			serviceButtons: {
				enabled: false,
			},
			headerLink: {
				enabled: true,
				href: "/login",
				text: "Back",
			},
			submitButton: {
				enabled: true,
				text: "Recover",
			},
		},
	},
} as const satisfies Record<verification_codesType["type"], AuthFormVariant>;

export const VerifyFormVariants = {
	title: "Verification",
	description: `Enter the verification code that's been sent to your email.`,

	elements: {
		code: {
			enabled: true,
			description: `This code will expire in ${AuthConfig.code.expiryMs / (60 * 1000)} minutes.`,
			placeholder: String().padStart(AuthConfig.code.length, "0"),
		},
	},
} as const satisfies VerifyFormVariant;

/**
 * types of authentication
 */
export type AuthFormVariantsType = keyof typeof AuthFormVariants;

/**
 * variants for the redirect popup
 */
export type RedirectPopupVariant = {
	title: string;
	description: string;
	content: string;
};

export const RedirectPopupVariants = {
	EMAIL_NOT_FOUND: {
		title: "Email unavailable",
		description:
			"We couldn't retrieve a verified email address from your authentication provider.",
		content:
			"This can happen if your provider account does not expose a public or verified email, or if access to email information was not granted during sign-in. Please ensure your account has a verified email or try a different sign-in method.",
	},
} as const satisfies Partial<Record<ExceptionCode, RedirectPopupVariant>>;
