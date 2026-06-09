/**
 * auth config
 */
export const AuthConfig = {
	password: {
		min: 8,
		max: 32,
	},
	code: {
		length: 6,
		expiryMs: 15 * 60 * 1000,
	},
	tokens: {
		access: {
			expiryMs: 5 * 60 * 1000,
		},
		refresh: {
			expiryMs: 30 * 24 * 60 * 60 * 1000,
		},
	},
} as const;
