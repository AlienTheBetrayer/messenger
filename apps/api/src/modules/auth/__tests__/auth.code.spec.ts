import { AuthCodeSchema } from "@gravity/shared";

import { jestInitAuth } from "./init";

/**
 * testing
 */
describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("happy paths", () => {
		for (const [type, count] of new Map<AuthCodeSchema["type"], 0 | 1>([
			["signup", 0],
			["login", 1],
			["forgot_password", 1],
		])) {
			it(`should issue a code for ${type} if user does ${count ? "" : "not"} exist`, async () => {
				// arrange
				const dto: AuthCodeSchema = {
					email: "email",
					type,
				};
				ctx.mockPrismaService.users.count.mockResolvedValue(count);

				// act
				await ctx.authService.code(dto);

				// assert
				expect(ctx.mockVerifyService.issueCode).toHaveBeenCalled();
			});
		}
	});

	describe("sad paths", () => {
		for (const [type, count] of new Map<AuthCodeSchema["type"], 0 | 1>([
			["signup", 1],
			["login", 0],
			["forgot_password", 0],
		])) {
			it(`should not issue a code for ${type} if user does ${count ? "" : "not"} exist`, async () => {
				// arrange
				const dto: AuthCodeSchema = {
					email: "email",
					type,
				};
				ctx.mockPrismaService.users.count.mockResolvedValue(count);

				// act
				const result = ctx.authService.code(dto);

				// assert
				await expect(result).rejects.toThrow();
				expect(ctx.mockVerifyService.issueCode).not.toHaveBeenCalled();
			});
		}
	});
});
