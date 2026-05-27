/**
 * text variants for the auth form's fields
 */
export const AuthFormVariants = {
	login: {
		title: "Login",
		description: "Log in to an existing account.",
		linkText: "Sign up",
		href: "/signup",
	},
	signup: {
		title: "Sign up",
		description: "Register a brand new account!",
		linkText: "Login",
		href: "/login",
  },
} as const;

/**
 * types of authentication
 */
export type AuthFormVariantsType = keyof typeof AuthFormVariants;
