import { verification_codesSchema } from "@gravity/shared";

import { VerifyServiceFactory } from "../../../common/jest/factories/verify";
import { jestInitAuth } from "./init";

describe("AuthService", () => {
	let ctx: Awaited<ReturnType<typeof jestInitAuth>>;

	beforeEach(async () => {
		ctx = await jestInitAuth();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("happy paths", () => {
		/**
		 * test 0: happy path
		 */
		it("should issue a verification code when a user requests a password reset", async () => {
			// arrange
			const mockCode = VerifyServiceFactory.issueCode();
			ctx.mockVerifyService.issueCode.mockResolvedValue(mockCode);
			ctx.mockPrismaService.users.count.mockResolvedValue(1);

			// act
			const result = await ctx.authService.code({
				email: "m@gmail.com",
				type: "forgot_password",
			});

			// assert
			expect(ctx.mockVerifyService.issueCode).toHaveBeenCalled();
			expect(verification_codesSchema.parse(result).code).toBe(mockCode.code);
		});
	});

	describe("sad paths", () => {
		/**
		 * test 0: sad path
		 */
		it("should throw when attempting a password reset on a non-existent email", async () => {
			// arrange
			ctx.mockPrismaService.users.count.mockResolvedValue(0);

			// act
			const result = ctx.authService.code({
				email: "m@gmail.com",
				type: "forgot_password",
			});

			// assert
			await expect(result).rejects.toThrow();
			expect(ctx.mockVerifyService.issueCode).not.toHaveBeenCalled();
		});
	});
});
