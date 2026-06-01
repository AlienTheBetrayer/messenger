import { ExceptionCode } from "@gravity/shared";

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

/**
 * text variants for the auth form's fields
 */
export const AuthFormVariants = {
	login: {
		title: "Login",
		description: "Log in to an existing account.",

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
		description: "Register a brand new account!",

		elements: {
			email: {
				enabled: true,
				placeholder: "m@example.com",
				description: "",
			},
			password: {
				enabled: true,
				description: "",
				placeholder: "",
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
	"forgot-password": {
		title: "Password recovery",
		description: "Enter the email address associated with your account.",

		elements: {
			email: {
				enabled: true,
				placeholder: "m@example.com",
				description: "",
			},
			password: {
				enabled: true,
				placeholder: "",
				description: "Enter a new secure password you'll use to log in.",
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
} as const satisfies Record<string, AuthFormVariant>;

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