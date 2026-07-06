import { ExceptionCode } from "@gravity/shared";
import { Variants } from "motion";

import { AuthFormType } from "@/features/auth/providers/AuthFormProvider";
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
			description: string;
		};
		password: {
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
				description: "",
			},
			password: {
				description:
					"Incorrect entry will require restarting the verification process.",
			},
		},
	},
	signup: {
		title: "Sign up",
		description: "Create your account to get started.",

		elements: {
			email: {
				description: "",
			},
			password: {
				description: "",
			},
		},
	},
	forgot_password: {
		title: "Password recovery",
		description: "Enter your email to receive a verification code.",

		elements: {
			email: {
				description: "",
			},
			password: {
				description: "New password for your account",
			},
		},
	},
} as const satisfies Record<AuthFormType, AuthFormVariant>;

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
  USER_ALREADY_EXISTS: {
    title: "User already exists.",
    description: "Session is already present.",
    content: "Log out first in order to add this session.",
  }
} as const satisfies Partial<Record<ExceptionCode, RedirectPopupVariant>>;

/**
 * for VerifyOrchestrator
 */
export const VerifyOrchestratorVariants: Variants = {
	initial: {
		opacity: 0,
		scale: 0.8,
		y: -100,
	},
	animate: {
		opacity: 1,
		scale: 1,
		y: 0,

		transition: {
			duration: 0.3,
			ease: [0.25, 0.1, 0.25, 1.0],
		},
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		y: -100,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.1, 0.25, 1.0],
		},
	},
};
