export default {
	moduleFileExtensions: ["js", "json", "ts"],
	extensionsToTreatAsEsm: [".ts"],

	// 1. FIXED: Keep rootDir as the base directory, use testMatch or src for code collection
	rootDir: ".",

	// 2. FIXED: Point regex explicitly to target your src directory
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

	// 3. FIXED: Handle both localized and hoisting monorepo node_modules structures
	transformIgnorePatterns: ["/node_modules/.pnpm/(?!(@dicebear\\+core)@)"],

	// 4. ADDED: Tell Jest how to resolve relative ESM file paths inside your shared package
	moduleNameMapper: {
		"^@gravity/shared$": "<rootDir>/../../packages/shared/src/index.ts",
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};
