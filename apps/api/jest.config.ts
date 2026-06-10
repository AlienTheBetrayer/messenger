export default {
	moduleFileExtensions: ["ts", "js", "json"],

	extensionsToTreatAsEsm: [".ts"],

	rootDir: ".",

	testRegex: "src/.*\\.spec\\.ts$",

	transform: {
		"^.+\\.(t|j)s$": [
			"ts-jest",
			{
				useESM: true,
				diagnostics: {
					ignoreCodes: [151002],
				},
			},
		],
	},

	testEnvironment: "node",

	collectCoverageFrom: ["src/**/*.(t|j)s"],

	transformIgnorePatterns: [
		"/node_modules/.pnpm/(?!(@dicebear\\+core)@)",
	],

	moduleNameMapper: {
		"^@gravity/shared$": "<rootDir>/../../packages/shared/src/index.ts",

		// ⚠️ keep this ONLY if you still have .js imports somewhere
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};