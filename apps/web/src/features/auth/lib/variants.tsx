import { ExceptionCode, verification_codesType } from "@gravity/shared";

import { Icons } from "@/features/ui/lib";

type VerifySuccessVariant = {
	title: string;
	description: string;

	elements: {
		redirectButton: {
			img: React.ReactNode;
			text: string;
			href: string;
		};
	};
};

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

/**
 * types of authentication
 */
export type AuthFormVariantsType = keyof typeof AuthFormVariants;

export const VerifySuccessVariants = {
	forgot_password: {
		title: "Password Changed",
		description: "Your password has been updated successfully.",
		elements: {
			redirectButton: {
				img: Icons.key,
				text: "Sign In",
				href: "/login",
			},
		},
	},

	login: {
		title: "You're Signed In",
		description: "Your login was verified successfully.",
		elements: {
			redirectButton: {
				img: Icons.profile,
				text: "Profile",
				href: "/profile",
			},
		},
	},

	signup: {
		title: "Account Created",
		description:
			"Your account has been created successfully. You can now sign in.",
		elements: {
			redirectButton: {
				img: Icons.key,
				text: "Sign In",
				href: "/login",
			},
		},
	},
} as const satisfies Partial<
	Record<"login" | "signup" | "forgot_password", VerifySuccessVariant>
>;

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
		title: "Email unavailable.",
		description: "We couldn't retrieve a verified email address.",
		content:
			"This can happen if your provider account does not expose a public or verified email.",
	},
	AUTHENTICATED: {
		title: "Already authenticated.",
		description: "You are already signed in.",
		content: "Log out first in order to log in or sign up using OAuth.",
	},
} as const satisfies Partial<Record<ExceptionCode, RedirectPopupVariant>>;
